exports.createPages = async function({ actions, graphql }) {
  try {
    const { data } = await graphql(`
      query {
        allStrapiProduct {
          nodes {
            slug
          }
        }
      }
    `)
    data.allStrapiProduct.nodes.forEach(node => {
      let { slug } = node
      slug = slug.toLowerCase()
      actions.createPage({
        path: slug,
        component: require.resolve(`./src/templates/product.js`),
        context: { slug: slug },
      })
    })
  } catch (error) {
    console.log("ERROR ⟹:", error)
  }
}
