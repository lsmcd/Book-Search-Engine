import {gql} from "@apollo/client"

export const LOGIN_USER = gql`
    mutation LOGIN_USER ($email: String!, $password: String!) {
        loginUser {
        user {
            id
        }
            token
        }
    }
`

export const ADD_USER = gql`
    mutation ADD_USER ($username: String!, $email: String!, $password: String!) {
        createUser {
            user {
                id
            }
            token
        }
    }
`