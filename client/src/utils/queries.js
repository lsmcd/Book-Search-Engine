import {gql} from "@apollo/client/"

export const GET_ME = gql`
  query GET_ME {
    me {
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
`;