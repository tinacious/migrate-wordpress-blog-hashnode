require('dotenv').config()

const Fs = require('fs')
const Path = require('path')
const client = require('./graphql-client');

const query = Fs.readFileSync(
  Path.join(__dirname, 'update-post.mutation.gql'),
  'utf-8'
)


const updatePost = async (post) => {
  const variables = {
    postId: post._id,
    input: post,
  }

  return client.request(query, variables)
  .then((data) => data)
  .catch((err) => {
    console.error('🚨 Error!')
    console.error(err)
  });
}


module.exports = updatePost;
