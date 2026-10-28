import styled from 'styled-components'
import { Button } from '@/components/ui'
import { theme as t } from '@/styles/theme'

const Table = styled.table`
  width:100%;border-collapse:collapse;background:#fff;border:2px solid ${t.ink};
  th,td{padding:10px 14px;text-align:left;border-bottom:1px solid ${t.line}} th{border-bottom:2px solid ${t.ink}}
  code{font-size:12px;color:#000000}
`

export default function MaterialsTable({ rows, emptyText, onEdit, onDelete }) {
  return (
    <Table>
      <thead><tr><th>Material ID</th><th>Title</th><th>Category</th><th /><th /></tr></thead>
      <tbody>
        {rows.map((m) => (
          <tr key={m.id}>
            <td><code>{m.id}</code></td><td>{m.title}</td><td>{m.category}</td>
            <td><Button onClick={() => onEdit(m)}>Edit</Button></td>
            <td><Button $danger onClick={() => onDelete(m)}>Delete</Button></td>
          </tr>
        ))}
        {!rows.length && <tr><td colSpan={5}>{emptyText}</td></tr>}
      </tbody>
    </Table>
  )
}
