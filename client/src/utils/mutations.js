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