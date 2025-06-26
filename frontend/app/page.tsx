import MenuBar from '../components/MenuBar'
import Hero from '../components/Hero'
import FeatureCard from '../components/FeatureCard'
import SignupForm from '../components/SignupForm'
import data from '../data/index.json'

export default function Home() {
  const { menu, hero, intro, features, signup } = data
  return (
    <>
      <MenuBar menu={menu} />
      <div className="landing-wrapper">
        <div className="ai-dev-container page gap-2">
          <Hero hero={hero} />
          <main>
            <p className="ai-dev-intro">{intro}</p>
            <section className="ai-dev-bullets">
              {features.map((f, i) => (
                <FeatureCard key={i} feature={f} />
              ))}
            </section>
            <SignupForm signup={signup} />
          </main>
        </div>
      </div>
    </>
  )
}
