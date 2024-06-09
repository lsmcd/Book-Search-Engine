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
    me: User
  },
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    saveBook(authors: [String], description: String!, bookId: String!, image: String, link: String, title: String!): User
    removeBook(bookId: String!): User
  }
`

module.exports = typeDefs;