import ApolloClient from "apollo-boost"
import fetch from "isomorphic-fetch"

const graphQlEndPoint = `${process.env.GATSBY_API_BASE_URL}/graphql`

export const client = new ApolloClient({
  uri: graphQlEndPoint,
  fetch,
})
