import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
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
