import  gql  from 'graphql-tag';

export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
  `;

  export const SAVE_BOOK = gql`
  mutation saveBook($input: savedBook!) {
    saveBook(input: $input) {
      _id
      username
      email
      bookCount
      savedBooks {
        # _id
        bookId
        authors
        image
        link
        title
        description
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        # _id
        bookId
        authors
        image
        link
        title
        description
      }
    }
  }
`;

export const ADD_USER = gql`
mutation createUser($username:String!, $email:String!, $password: String!) {
  createUser(username:$username, email:$email, password: $password) {
    user {
      _id
      username
      email
      bookCount
      savedBooks {
        authors
        bookId
        image
        link
        title
        description
      }
    }
    token
  }
}
`;