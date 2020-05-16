/**
 * Creating creating a page based on each product slug
 */
exports.createPages = async function({ actions, graphql }) {
  try {
    const { data } = await graphql(`
      query {
        allStrapiProduct {
          nodes {
            slug
            show_product
          }
        }
      }
    `)

    if (!data.allStrapiProduct) return null

    data.allStrapiProduct.nodes.forEach(node => {
      let { slug, show_product } = node
      slug = slug.toLowerCase()
      if (show_product) {
        actions.createPage({
          path: `/shop/${slug}`,
          component: require.resolve(`./src/templates/product.js`),
          context: { slug: slug },
        })
      }
    })
  } catch (error) {
    console.log("ERROR ⟹:", error)
  }
}
