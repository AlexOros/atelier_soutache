import React, { useEffect } from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"

import { graphql } from "gatsby"

export const GATSBY_QUERY = graphql`
  {
    products {
      products {
        id
        title
        image {
          name
          url
        }
      }
    }
  }
`

const APOLLO_QUERY = gql`
  query getProducts {
    products {
      id
      title
      stock
    }
  }
`
const UPDATE_PRODUCTS = gql`
  mutation {
    updateProduct(
      input: { where: { id: "3" }, data: { stock: 121, title: "Black Beauty" } }
    ) {
      product {
        title
        stock
      }
    }
  }
`

const Test = () => {
  const { data, loading, error } = useQuery(APOLLO_QUERY)
  const [updateProduct] = useMutation(UPDATE_PRODUCTS)

  useEffect(() => {
    fetch("http://localhost:1337/test")
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>
  return (
    <div>
      {/* <pre>{JSON.stringify(data.products, null, 2)}</pre>{" "} */}
      <pre>{JSON.stringify(data.products, null, 2)}</pre>{" "}
      <button
        onClick={() => {
          fetch("http://localhost:1337/tests", {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: "LALALAAASDSAD",
              random: Math.floor(Math.random() * 10000),
            }),
          })
            .then(response => response.json())
            .then(data => {
              console.log("Success:", data)
            })
            .catch(error => {
              console.error("Error:", error)
            })
          // updateProduct({
          //   variables: [{ id: "3", stock: 20 }, { id: "1" }],
          // }).then(result => console.log(result))
        }}
      >
        PressMe
      </button>
    </div>
  )
}

export default Test
