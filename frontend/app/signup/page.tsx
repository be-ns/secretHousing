import MenuBar from '../../components/MenuBar'
import SignupForm from '../../components/SignupForm'
import AiCommandBar from '../../components/AiCommandBar'
import data from '../../data/signup.json'

export default function SignupPage() {
  const { menu, heading, signup, seoText } = data
  return (
    <>
      <MenuBar menu={menu} />
      <div className="ai-dev-container page gap-2">
        <main>
          <h1>{heading}</h1>
          <div className="signup-container">
            <SignupForm signup={signup} />
          </div>
          <section className="seo-text">
            <h2>{seoText.headline}</h2>
            {seoText.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>
        </main>
      </div>
      <AiCommandBar pageName="signup" />
    </>
  )
}
