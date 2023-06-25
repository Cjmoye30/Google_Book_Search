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
    bookId: String
    authors: [Authors!]
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
    user: User
}

input saveBookInput {
    authors: [Authors!]
    description: String!
    title: String!
    image: String
    link: String
}

type Mutation {
    login(username: String!, email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(criteria: saveBookInput): User
    deleteBook(bookId: String!): Auth
}
`
module.exports = typeDefs