'use client'
import Modal from './Modal'

export default function AddPropertyModal({ open, onClose, title, actions, onSelect }: { open: boolean; onClose: () => void; title: string; actions: string[]; onSelect: () => void }) {
  return (
    <Modal open={open} onClose={onClose}>
      <h2>{title}</h2>
      <div className="modal-actions">
        <button className="ai-dev-btn" onClick={onSelect}>{actions[0]}</button>
        <button className="ai-dev-btn" onClick={onSelect}>{actions[1]}</button>
      </div>
    </Modal>
  )
}
