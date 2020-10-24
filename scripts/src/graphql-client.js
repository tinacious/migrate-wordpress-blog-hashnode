require('dotenv').config()

const { GraphQLClient } = require('graphql-request')

const client = new GraphQLClient('https://api.hashnode.com', {
  headers: {
    Authorization: process.env.HASHNODE_API_KEY
  }
})

module.exports = client;
