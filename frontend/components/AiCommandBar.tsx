'use client'
import { useState } from 'react'

export default function AiCommandBar({ pageName }: { pageName: string }) {
  const [command, setCommand] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; error?: boolean } | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!command) return
    setLoading(true)
    setMessage(null)
    try {
      const res = await fetch(`/api/edit/${pageName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: command })
      })
      if (!res.ok) {
        const err = await res.json().catch(() => null)
        throw new Error(err?.error || 'Request failed')
      }
      await res.json()
      setMessage({ text: 'Success!' })
      setCommand('')
    } catch (err: any) {
      setMessage({ text: err.message || 'Error', error: true })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="ai-command-bar" onSubmit={handleSubmit}>
      <label htmlFor="ai-command" className="ai-dev-sr-only">
        AI command
      </label>
      <input
        id="ai-command"
        type="text"
        className="ai-dev-input"
        placeholder="Edit command"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        disabled={loading}
      />
      <button type="submit" className="ai-dev-btn" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      {message && (
        <span className={`status-msg${message.error ? ' error' : ''}`}>{message.text}</span>
      )}
    </form>
  )
}
