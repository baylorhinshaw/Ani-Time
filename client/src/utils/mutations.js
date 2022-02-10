import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const SAVE_ANIME = gql`
mutation saveAnime($_id: ID!, $title_english: String, $score: Int!, $image: String) {
  saveAnime() {
    
  }
}
`;

export const REMOVE_ANIME = gql`
mutation removeAnime($_id: ID!) {
  removeAnime() {
    
  }
}
`;