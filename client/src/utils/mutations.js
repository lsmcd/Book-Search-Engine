import {gql} from "@apollo/client/"

export const LOGIN_USER = gql`
    mutation LOGIN_USER ($email: String!, $password: String!) {
        loginUser (email: $email, password: $password) {
            user {
                id
            }
            token
        }
    }
`

export const ADD_USER = gql`
    mutation ADD_USER ($username: String!, $email: String!, $password: String!) {
        addUser (username: $username, email: $email, password: $password) {
            user {
                id
            }
            token
        }
    }
`

export const SAVE_BOOK = gql`
    mutation SAVE_BOOK ($authors: [String], $description: String!, $bookId: String!, $image: String, $link: String, $title: String!) {
        saveBook (authors: $authors, description: $description, bookId: $bookId, image: $image, link: $link, title: $title) {
            username
            email
            password
            savedBooks {
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`

export const REMOVE_BOOK = gql`
    mutation REMOVE_BOOK ($bookId: String!) {
        removeBook (bookId: $bookId) {
            username
            email
            password
            savedBooks {
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`