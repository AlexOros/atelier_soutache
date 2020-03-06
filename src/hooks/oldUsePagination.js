import { useState, useMemo, useEffect, useCallback } from "react"

const usePagination = ({ itemsPerPage = 6, items }) => {
  console.log("𝕃𝕆𝔾 ⟹: usePagination -> items", items)
  const [page, setPage] = useState([])
  const [paginatedItems, setPaginatedItems] = useState([])
  console.log("𝕃𝕆𝔾 ⟹: usePagination -> paginatedItems", paginatedItems)

  const memoMaxPages = useMemo(() => Math.ceil(items.length / itemsPerPage), [
    itemsPerPage,
    items,
  ])

  const memoPaginatedItems = useMemo(() => {
    let pageN = 0
    let currentArray = []
    let pageArr = []

    items.forEach((item, indx) => {
      if (indx % itemsPerPage === 1) {
        pageArr.push(item)
        currentArray[pageN] = pageArr
        pageN += 1
        pageArr = []
      } else {
        pageArr.push(item)
      }
    })
    return currentArray
  }, [items, itemsPerPage])

  useEffect(() => {
    setPaginatedItems(() => memoPaginatedItems)
  }, [memoPaginatedItems])

  // Init the first page or blank
  useEffect(() => {
    setPage(() => paginatedItems[0] || [])
  }, [paginatedItems])

  const handleChangePage = useCallback(
    (e, nextPage) => {
      setPage(paginatedItems[nextPage - 1])
    },
    [paginatedItems]
  )

  return {
    page,
    maxPages: memoMaxPages,
    handleChangePage,
  }
}

export default usePagination
