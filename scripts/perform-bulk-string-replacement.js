const OLD_STRING = process.env.OLD_STRING;
const NEW_STRING = process.env.NEW_STRING;

console.log('old', OLD_STRING)
console.log('new', NEW_STRING)

const getPosts = require('./src/get-posts');

getPosts(0).then((posts) => {
  console.log('posts', posts)
})
