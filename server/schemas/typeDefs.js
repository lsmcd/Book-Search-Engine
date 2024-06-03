const typeDefs = `#graphql
  type Book {
    id: ID
    authors: [String]
    description: String!,
    bookId: String!,
    image: String,
    link: String,
    title: String!,
  },
  type User {
    id: ID
    username: String!,
    email: String!,
    password: String!, 
    savedBooks: [Book],
  },
  type Query {
    users: [User],
    getSingleUser (userID: ID!): User
  },
`

module.exports = typeDefs;