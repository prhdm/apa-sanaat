'use client'

import { useEffect } from 'react'
import { useBreadcrumb, type BreadcrumbItem } from './breadcrumb-context'

export function SetBreadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const { setItems } = useBreadcrumb()

  useEffect(() => {
    setItems(items)
    return () => setItems([])
    // items are stable server-derived values; re-run only if serialized form changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(items)])

  return null
}
