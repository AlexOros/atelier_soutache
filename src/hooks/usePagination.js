import { useState, useMemo, useCallback, useEffect } from "react"

const usePagination = ({ itemsPerPage = 2, items }) => {
  const [paginatedItems, setPaginatedItems] = useState([])

  const memoMaxPages = useMemo(() => Math.ceil(items.length / itemsPerPage), [
    itemsPerPage,
    items,
  ])

  const handleChangePage = useCallback(
    (e, nextPage) => {
      const nextTo = itemsPerPage * nextPage
      const nextFrom = nextTo - itemsPerPage
      setPaginatedItems(items.slice(nextFrom, nextTo))
    },
    [items, itemsPerPage]
  )

  // Init the first items
  useEffect(() => {
    if (!paginatedItems.length) {
      handleChangePage({}, 1)
    }
  }, [handleChangePage, paginatedItems.length])

  return {
    maxPages: memoMaxPages,
    handleChangePage,
    paginatedItems,
  }
}

export default usePagination
