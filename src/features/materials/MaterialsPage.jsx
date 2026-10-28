import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Input, Select } from '@/components/ui'
import { CATEGORIES, DEFAULT_PAGE, PAGES } from '@/config/materials'
import { deleteMaterial } from './api'
import MaterialForm from './MaterialForm'
import MaterialsTable from './MaterialsTable'
import { useMaterials } from './useMaterials'

const Bar = styled.div`display:flex;gap:10px;flex-wrap:wrap;margin-bottom:18px;& > input{flex:1;min-width:200px}& > select{width:auto}`

function MaterialsPage({ page }) {
  const { items, tags } = useMaterials(page)
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('')
  const [tag, setTag] = useState('')
  const [modal, setModal] = useState(null) // null | 'add' | material being edited

  const rows = items
    .filter((m) => m.title.toLowerCase().includes(q.toLowerCase()) && (!cat || m.category === cat) && (!tag || (m.tags || []).includes(tag)))
    .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
  const remove = (m) => window.confirm(`Delete "${m.title}"? This cannot be undone.`) && deleteMaterial(m.id)

  return (
    <>
      <Bar>
        <Input aria-label="Search by title" placeholder="Search by title" value={q} onChange={(e) => setQ(e.target.value)} />
        <Select aria-label="Filter by category" value={cat} onChange={(e) => setCat(e.target.value)}>
          <option value="">All categories</option>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </Select>
        <Select aria-label="Filter by tag" value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="">All tags</option>{tags.map((x) => <option key={x}>{x}</option>)}
        </Select>
        <Button $primary onClick={() => setModal('add')}>Add material</Button>
      </Bar>
      <MaterialsTable
        rows={rows}
        emptyText={items.length ? 'No materials match these filters.' : `No ${PAGES[page].label} materials yet. Add the first one.`}
        onEdit={setModal}
        onDelete={remove}
      />
      {modal && <MaterialForm page={page} item={modal === 'add' ? null : modal} knownTags={tags} onClose={() => setModal(null)} />}
    </>
  )
}

// key={page} resets search/filters when switching IELTS <-> SAT
export default function MaterialsRoute() {
  const { page } = useParams()
  return PAGES[page] ? <MaterialsPage key={page} page={page} /> : <Navigate to={`/materials/${DEFAULT_PAGE}`} replace />
}
