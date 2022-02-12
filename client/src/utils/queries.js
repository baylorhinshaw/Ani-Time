import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  {
    user {
      _id
      firstname
      lastname
      email
      password
      savedAnimes {
        mal_id 
        titleEnglish
        titleJapanese
        image
        score
      }
    }
  }
`;
