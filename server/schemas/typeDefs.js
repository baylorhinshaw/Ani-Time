const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    savedAnimes: [Anime]
  }

  type Anime {
    mal_id: Int
    titleJapanese: String
    titleEnglish: String
    score: Float
    image: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    user: User
  }

  type Mutation {
    addUser(firstname: String!, lastname: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveAnime(titleEnglish: String, titleJapanese: String, score: Float!, mal_id: Int, genres: [String], image: String): User
    removeAnime(mal_id: Int): User
    changePassword(password: String!): Auth
  }
`;

module.exports = typeDefs;
