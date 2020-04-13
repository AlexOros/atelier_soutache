import ApolloClient from "apollo-boost"
import fetch from "isomorphic-fetch"
//TODO add base url in .env
export const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  fetch,
})
