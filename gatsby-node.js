const path = require("path")
const slash = require("slash")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Query posts.
  const result = await graphql(`
    query {
      wpgraphql {
        posts {
          edges {
            node {
              id
              postId
              slug
              status
            }
          }
        }
      }
    }
  `)

  // Handle query errors.
  if (result.errors) {
    throw new Error(result.errors)
  }

  const { posts } = result.data.wpgraphql

  // Create posts.
  const postTemplate = path.resolve("./src/templates/post.js")

  posts.edges.forEach(edge => {
    createPage({
      path: `/${edge.node.slug}/`,
      component: slash(postTemplate),
      context: {
        id: edge.node.id,
      },
    })
  })
}
