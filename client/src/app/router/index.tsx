import { Navigate, createBrowserRouter } from 'react-router'
import {
  AppLayout,
  AuthLayout,
  NotesLayout,
  SettingsLayout,
} from '../layouts'
import {
  ChangePasswordPage,
  ColorThemePage,
  CreateNotePage,
  ForgotPasswordPage,
  FontThemePage,
  LoginPage,
  NoteDetailsPage,
  NotesIndexPage,
  NotFoundPage,
  ResetPasswordPage,
  SignupPage,
} from '../../pages'

function RootRedirect() {
  return <Navigate replace to="/notes" />
}

function SettingsRedirect() {
  return <Navigate replace to="/settings/color-theme" />
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootRedirect,
  },
  {
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: LoginPage,
      },
      {
        path: 'signup',
        Component: SignupPage,
      },
      {
        path: 'forgot-password',
        Component: ForgotPasswordPage,
      },
      {
        path: 'reset-password',
        Component: ResetPasswordPage,
      },
    ],
  },
  {
    Component: AppLayout,
    children: [
      {
        path: 'notes',
        Component: NotesLayout,
        children: [
          {
            index: true,
            Component: NotesIndexPage,
          },
          {
            path: 'new',
            Component: CreateNotePage,
          },
          {
            path: ':noteId',
            Component: NoteDetailsPage,
          },
        ],
      },
      {
        path: 'settings',
        Component: SettingsLayout,
        children: [
          {
            index: true,
            Component: SettingsRedirect,
          },
          {
            path: 'color-theme',
            Component: ColorThemePage,
          },
          {
            path: 'font-theme',
            Component: FontThemePage,
          },
          {
            path: 'change-password',
            Component: ChangePasswordPage,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
])
