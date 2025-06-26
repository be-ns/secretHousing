import Image from 'next/image'

export interface HeroData {
  eyebrow: string
  headline: string
  subHeadline: string
  image: string
  imageAlt: string
}

export default function Hero({ hero }: { hero: HeroData }) {
  return (
    <section className="hero page gap-2">
      <div className="hero-copy">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>{hero.headline}</h1>
        <p className="sub-headline">{hero.subHeadline}</p>
      </div>
      <div className="hero-visual">
        <Image src={`/${hero.image}`} alt={hero.imageAlt} width={800} height={600} />
      </div>
    </section>
  )
}
