export default function DashboardKPI({ kpis }: { kpis: string[] }) {
  return (
    <div className="dashboard-kpis">
      {kpis.map((kpi, idx) => (
        <div key={idx} className="kpi">
          {kpi}
        </div>
      ))}
    </div>
  )
}
