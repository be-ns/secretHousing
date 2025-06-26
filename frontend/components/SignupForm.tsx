'use client'
import { useEffect, useRef, useState } from 'react'

export interface SignupData {
  action: string
  label: string
  placeholder: string
  buttonText: string
  thankYou: string
}

export default function SignupForm({ signup }: { signup: SignupData }) {
  const [submitted, setSubmitted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer:fine)').matches) {
      inputRef.current?.setAttribute('autofocus', 'autofocus')
    }
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const res = await fetch(signup.action, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    })
    if (res.ok) {
      setSubmitted(true)
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    }
  }

  return (
    <div id="signup-wrapper" aria-live="polite">
      {submitted ? (
        <p className="signup-thankyou" tabIndex={-1} ref={inputRef}>
          {signup.thankYou}
        </p>
      ) : (
        <form className="signup" action={signup.action} method="POST" onSubmit={handleSubmit}>
          <label htmlFor="signup-email" className="ai-dev-sr-only">
            {signup.label}
          </label>
          <input id="signup-email" name="email" type="email" placeholder={signup.placeholder} required ref={inputRef} />
          <button type="submit">{signup.buttonText}</button>
        </form>
      )}
    </div>
  )
}
