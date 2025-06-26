export interface PipelineRow {
  project: string
  stage: string
  irr: string
  capex: string
  nextDate: string
  risk: string
}

export interface PipelineData {
  title: string
  headers: string[]
  rows: PipelineRow[]
}

export default function PipelineTable({ data }: { data: PipelineData }) {
  return (
    <section className="pipeline-table dashboard-section full-width">
      <h2>{data.title}</h2>
      <table>
        <thead>
          <tr>
            {data.headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, idx) => (
            <tr key={idx}>
              <td>{row.project}</td>
              <td>{row.stage}</td>
              <td>{row.irr}</td>
              <td>{row.capex}</td>
              <td>{row.nextDate}</td>
              <td>{row.risk}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
