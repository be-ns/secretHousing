export interface ListSectionData {
  title: string
  items: string[]
  className?: string
}

export default function ActionQueue({ title, items, className = '' }: ListSectionData) {
  return (
    <section className={`dashboard-section ${className}`.trim()}>
      <h2>{title}</h2>
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </section>
  )
}
