import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstname
        lastname
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstname: String!, $lastname: String!, $email: String!, $password: String!) {
    addUser(firstname: $firstname, lastname: $lastname, email: $email, password: $password) {
      token
      user {
        _id
        firstname
        lastname
        email
      }
    }
  }
`
export const SAVE_ANIME = gql`
mutation saveAnime($titleEnglish: String, $titleJapanese: String, $score: Float!, $mal_id: Int, $genres: [String], $image: String) {
  saveAnime(titleEnglish: $titleEnglish, titleJapanese: $titleJapanese, score: $score, mal_id: $mal_id, genres: $genres, image: $image) {
    _id
    firstname
    lastname
    email
    savedAnimes {
      mal_id
      titleEnglish
      titleJapanese
      score
      image
    }
  }
}
`;


export const REMOVE_ANIME = gql`
mutation removeAnime($mal_id: Int) {
  removeAnime(mal_id: $mal_id) {
    _id
    firstname
    lastname
    email
    savedAnimes {
      mal_id
      titleEnglish
      titleJapanese
      score
      image
    }
  }
}`

export const CHANGE_PASSWORD = gql`
mutation changePassword($password: String!) {
  changePassword(password: $password) {
    token
    user {
      _id
      firstname
      lastname
      email
    }
  }
}`
