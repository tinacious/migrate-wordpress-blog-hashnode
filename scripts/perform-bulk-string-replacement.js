const OLD_STRING = process.env.OLD_STRING;
const NEW_STRING = process.env.NEW_STRING;

console.log('old', OLD_STRING)
console.log('new', NEW_STRING)

const getPosts = require('./src/get-posts');
const updatePost = require('./src/update-post');

/**
 * returns a list of posts with the content updated.
 * only includes posts that have had their content updated.
 */
const replaceStringForPostsInPage = (posts) => {
  const oldMatch = new RegExp(OLD_STRING, 'g');

  return posts
    .filter(({ contentMarkdown }) =>
      contentMarkdown !== contentMarkdown.replace(oldMatch, NEW_STRING)
    )
    .map((post) => ({
      ...post,
      contentMarkdown: post.contentMarkdown.replace(oldMatch, NEW_STRING)
    }));
}

// Pagination
const DEFAULT_HASHNODE_PAGE_SIZE = 6;
let page = 6; // TODO: 0
let currentPageSize = 0;


const performBulkStringReplacement = async () => {
  console.log(`⚙️ Performing string replacement
  Old string: ${OLD_STRING}
  New string: ${NEW_STRING}`);

  do {
    console.log(`Getting posts for page ${page}`);
    const posts = await getPosts(page);
    currentPageSize = posts.length;

    const updatedPosts = replaceStringForPostsInPage(posts);
    updatedPosts.forEach(async (post) => {
      console.log(`Updating post: ${post.title}`);

      console.log(post.contentMarkdown)
      const updated = await updatePost(post);
      console.log(updated)
    });

    page++;
  } while (currentPageSize > 0);
}


performBulkStringReplacement();
