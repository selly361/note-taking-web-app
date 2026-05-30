import type { PropsWithChildren } from 'react'

type PagePlaceholderProps = PropsWithChildren<{
  title: string
  description?: string
}>

export function PagePlaceholder({
  title,
  description,
  children,
}: PagePlaceholderProps) {
  return (
    <section className="flex flex-col gap-3 p-8">
      <h1 className="text-2xl font-semibold">{title}</h1>

      {description && (
        <p className="text-sm text-slate-400">{description}</p>
      )}

      {children}
    </section>
  )
}
