import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($username: String!, $email: String!, $password: String!) {
        login(username: $username, email: $email, password: $password) {
            _id
            _username
            _email
            _password
        }
    }

`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            _id
            _username
            _email
            _password
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($criteria: saveBookInput!) {
        saveBook(criteria: $criteria) {
            _id
            authors
            description
            title
            image
            link
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation deleteBook($bookId: String) {
        deleteBook(bookId: $bookId) {
            _id
        }
    }

`;