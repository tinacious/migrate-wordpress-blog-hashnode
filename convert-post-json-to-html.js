// You need a posts.json file at the root
const posts = require('./posts.json')

const publishedPosts = posts.filter((post) => !!post.Date)

console.log({
  posts: posts.length,
  publishedPosts: publishedPosts.length,
  drafts: posts.length - publishedPosts.length
})
