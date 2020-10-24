const Fs = require('fs')
const Path = require('path')

const client = require("./graphql-client")

const query = Fs.readFileSync(
  Path.join(__dirname, 'get-user-posts.query.gql'),
  'utf-8'
)

const getPosts = (page = 0) => {
  const variables = {
    page
  };

  return client.request(query, variables)
    .then((data) => {
      console.log('✅ Success!')
      console.log(data)
      return data.user.publication.posts;
    })
    .catch((err) => {
      console.error('🚨 Error!')
      console.error(err)
    });
}

module.exports = getPosts;
