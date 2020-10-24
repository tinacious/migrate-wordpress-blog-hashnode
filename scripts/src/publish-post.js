require('dotenv').config()

const Fs = require('fs')
const Path = require('path')
const client = require('./graphql-client');

const query = Fs.readFileSync(
  Path.join(__dirname, 'create-post.mutation.gql'),
  'utf-8'
)

const publishPost = async (post) => {
  const variables = {
    hideFromHashnodeFeed: true,
    publicationId: process.env.HASHNODE_PUBLICATION_ID,
    input: {
      title: post.title,
      contentMarkdown: post.content,
      isRepublished: {
        originalArticleURL: post.url,
      },
      tags: []
    }
  }


  return client.request(query, variables)
    .then((data) => {
      console.log('✅ Success!')
      console.log(data)
      return post.title
    })
    .catch((err) => {
      console.error('🚨 Error!')
      console.error(err)
    });
};


module.exports = publishPost;


if (process.env.TEST_PUBLISH) {
  const testPost = {
  }

  publishPost(testPost)
}
