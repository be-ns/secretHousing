'use client'
import { useState } from 'react'
import Modal from './Modal'

export default function PropertyDetailsModal({ open, onClose, title, addressLabel, documentsLabel, saveText }: { open: boolean; onClose: () => void; title: string; addressLabel: string; documentsLabel: string; saveText: string }) {
  const [address, setAddress] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onClose()
    alert('Property saved')
  }

  return (
    <Modal open={open} onClose={onClose}>
      <h2>{title}</h2>
      <form className="modal-form" onSubmit={handleSubmit} id="propertyForm">
        <label>
          {addressLabel}
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </label>
        <label>
          {documentsLabel}
          <input type="file" multiple />
        </label>
        <div className="modal-actions">
          <button type="submit" className="ai-dev-btn">
            {saveText}
          </button>
        </div>
      </form>
    </Modal>
  )
}
