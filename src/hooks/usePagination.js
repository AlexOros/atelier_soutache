import { useState, useMemo, useCallback, useEffect } from "react"

const usePagination = ({ itemsPerPage = 2, items, currentPage }) => {
  const [paginatedItems, setPaginatedItems] = useState([])

  const memoMaxPages = useMemo(() => Math.ceil(items.length / itemsPerPage), [
    itemsPerPage,
    items,
  ])

  const changePage = useCallback(
    (e, nextPage) => {
      const nextTo = itemsPerPage * nextPage
      const nextFrom = nextTo - itemsPerPage
      setPaginatedItems(items.slice(nextFrom, nextTo))
    },
    [items, itemsPerPage]
  )

  // Init the first items
  useEffect(() => {
    changePage({}, currentPage)
  }, [items, changePage, currentPage])

  return {
    maxPages: memoMaxPages,
    changePage,
    paginatedItems,
  }
}

export default usePagination
