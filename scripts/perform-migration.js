const publishPost = require('./src/publish-post');

const POSTS_TO_BATCH_UPLOAD = require('../posts/cleaned.json');

POSTS_TO_BATCH_UPLOAD
  .forEach((post) => {
    publishPost(post)
  })
