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
  type Auth {
    token: ID!
    user: User
  },
  type Query {
    users: [User],
    me (userID: ID!): User
  },
  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`

module.exports = typeDefs;