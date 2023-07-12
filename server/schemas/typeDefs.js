const { gql } = require('apollo-server-express');


const typeDefs = gql`

type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    bookId: String!
    authors: [String!]
    description: String!
    title: String!
    image: String
    link: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
}

input saveBookInput {
    bookId: String!
    authors: [String!]
    description: String!
    title: String!
    image: String
    link: String
}

# mutations are modifying the data on the server
# all of the fields defined are the available operations for modifying data on the server
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(criteria: saveBookInput): User
    deleteBook(bookId: String!): Auth
}
`
module.exports = typeDefs