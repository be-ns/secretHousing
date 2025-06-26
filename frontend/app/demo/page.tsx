'use client'
import { useState } from 'react'
import MenuBar from '../../components/MenuBar'
import DashboardKPI from '../../components/DashboardKPI'
import ActionQueue from '../../components/ActionQueue'
import PipelineTable from '../../components/PipelineTable'
import AddPropertyModal from '../../components/AddPropertyModal'
import PropertyDetailsModal from '../../components/PropertyDetailsModal'
import AiCommandBar from '../../components/AiCommandBar'
import data from '../../data/demo.json'

export default function DemoPage() {
  const { menu, dashboardTop, kpis, actionQueue, marketRadar, pipeline, eventFeed, modals } = data
  const [addOpen, setAddOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)

  function openDetails() {
    setAddOpen(false)
    setDetailsOpen(true)
  }

  return (
    <>
      <MenuBar menu={menu} />
      <div className="ai-dev-container">
        <nav className="dashboard-top">
          <div className="top-left">
            {dashboardTop.leftButtons.map((btn) => (
              <a key={btn.id} href={btn.href} className="dashboard-btn" onClick={btn.id === 'addPropertyBtn' ? (e) => { e.preventDefault(); setAddOpen(true) } : undefined}>{btn.text}</a>
            ))}
          </div>
          <div className="top-right">
            {dashboardTop.rightLinks.map((l) => (
              <a key={l.text} href={l.href} className="dashboard-link">{l.text}</a>
            ))}
          </div>
        </nav>
        <DashboardKPI kpis={kpis} />
        <div className="dashboard-main page gap-2">
          <ActionQueue title={actionQueue.title} items={actionQueue.items} className="action-queue" />
          <ActionQueue title={marketRadar.title} items={marketRadar.items} className="market-radar" />
          <PipelineTable data={pipeline} />
          <ActionQueue title={eventFeed.title} items={eventFeed.items} className="event-feed full-width" />
        </div>
      </div>
      <AddPropertyModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title={modals.addProperty.title}
        actions={modals.addProperty.actions}
        onSelect={openDetails}
      />
      <PropertyDetailsModal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        title={modals.propertyDetails.title}
        addressLabel={modals.propertyDetails.addressLabel}
        documentsLabel={modals.propertyDetails.documentsLabel}
        saveText={modals.propertyDetails.saveText}
      />
      <AiCommandBar pageName="demo" />
    </>
  )
}
