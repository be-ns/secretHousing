export interface Feature {
  iconPath: string
  title: string
  text: string
}

export default function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <article className="ai-dev-card">
      <svg className="ai-dev-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d={feature.iconPath} />
      </svg>
      <div>
        <h3>{feature.title}</h3>
        <p>{feature.text}</p>
      </div>
    </article>
  )
}
