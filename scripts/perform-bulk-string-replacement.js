const OLD_STRING = process.env.OLD_STRING;
const NEW_STRING = process.env.NEW_STRING;

console.log('old', OLD_STRING)
console.log('new', NEW_STRING)

const getPosts = require('./src/get-posts');

const replaceStringForPostsInPage = (posts) => {
  const oldMatch = new RegExp(OLD_STRING, 'g');

  posts.forEach((post) => {
    post.contentMarkdown = post.contentMarkdown.replace(oldMatch, NEW_STRING)
  })

  return posts;
}

// Pagination
const DEFAULT_HASHNODE_PAGE_SIZE = 6;
let page = 5; // TODO: 0
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

    const titles = updatedPosts.map((post) => post.title)
    console.log(titles)

    page++;
  } while (currentPageSize > 0);
}


performBulkStringReplacement();
