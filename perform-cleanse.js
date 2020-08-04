const Path = require('path')
const Fs = require('fs')

const AttributeRemover = require('html-attributes-remover').default
const imgAttributeRemover = new AttributeRemover({
  'htmlTags': ['img'],
  'attributes': ['style', 'class']
})

const Turndown = require('turndown')
const turndownService = new Turndown({
  headingStyle: 'atx',
  hr: '---',
  bulletListMarker: '-',
  fence: '```',
  emDelimiter: '_',
  strongDelimiter: '**',
  linkStyle: 'inlined'
})



/**
 * Some constants you'll need to change
 */
// You need a posts.json file at the root
const EXISTING_POSTS = require('./posts.json')
const OLD_MEDIA_PATH = 'http://tinaciousdesign.com/wp-content/uploads/'
const NEW_MEDIA_PATH = 'https://tinaciousdesign.imfast.io/'
const NEW_POSTS_PATH = './posts/cleaned.json'


const publishedPosts = EXISTING_POSTS.filter((post) => !!post.Date && post.Permalink.indexOf('?p=') === -1)

/**
 * Hashmap of { filename: metadata }
 * Data contains:
 *    - title
 *    - excerpt
 *    - content
 *    - slug
 *    - date (ISO format)
 */
const postData = []

console.log({
  posts: EXISTING_POSTS.length,
  publishedPosts: publishedPosts.length,
  drafts: EXISTING_POSTS.length - publishedPosts.length
})

/**
 * Does what it says on the box.
 */
const replaceAllOldUrlsWithNewUrls = (post) => {
  const postCopy = JSON.parse(JSON.stringify(post))
  postCopy.Content = postCopy.Content.replace(OLD_MEDIA_PATH, NEW_MEDIA_PATH, 'g')
  return postCopy
}

/**
 * Leverages a third-party library to clean up unneeded WordPress attributes like <img class=' />
 */
const cleanPostHtml = (post) => {
  const cleanedContent = imgAttributeRemover.remove(post.Content)
  post.Content = cleanedContent;
  return post;
}

const convertPostHtmlToMarkdown = (post) => {
  post.Content = turndownService.turndown(post.Content)
  return post
}

/**
 * Using the provided post data and keyname, writes relevant metadata
 */
const addPostToPostData = (post, keyname) => {
  postData.push({
    title: post.Title,
    excerpt: post.Excerpt,
    content: post.Content,
    slug: keyname,
    date: new Date(post.Date).toISOString(),
  })
}

const persistPostData = (data) => {
  Fs.writeFileSync(
    Path.join(__dirname, NEW_POSTS_PATH),
    JSON.stringify(data, null, 2),
    'utf8'
  )
}


/**
 * quick and dirty clone
 */
const clone = (o) => JSON.parse(JSON.stringify(o))


publishedPosts.forEach((oldPost) => {
  // Transformations
  let post = clone(oldPost)
  post = replaceAllOldUrlsWithNewUrls(post)
  post = cleanPostHtml(post)
  post = convertPostHtmlToMarkdown(post)

  // Persistence
  const filename = post.Permalink.split('/').reverse()[1];
  addPostToPostData(post, filename)
})

persistPostData(postData)
