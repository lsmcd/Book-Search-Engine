const queries = gql`
  query GET_ME {
    me {
      id
      username
      email
      savedBooks
    }
  }
`;

export default queries;
