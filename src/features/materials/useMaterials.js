import { useEffect, useMemo, useState } from 'react'
import { PAGES } from '@/config/materials'
import { subscribeMaterials } from './api'

export function useMaterials(page) {
  const [items, setItems] = useState([])
  useEffect(() => subscribeMaterials(page, setItems), [page])
  // fixed tags for the page + any custom tag already used by its materials
  const tags = useMemo(() => [...new Set([...PAGES[page].tags, ...items.flatMap((m) => m.tags || [])])], [page, items])
  return { items, tags }
}
