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
    _id: ID
    mal_id: Int
    genres: [String]
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
    user(_id: ID!): User
    me: User
  }

  type Mutation {
    addUser(firstname: String!, lastname: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveAnime(titleEnglish: String, titleJapanese: String, score: Float!, mal_id: Int, genres: [String], image: String): User
    removeAnime(mal_id: Int): User
  }
`;

module.exports = typeDefs;
