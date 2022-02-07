const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Anime {
    _id: ID!
    title_japanese: String
    title_english: String
    score: Int!
    image: String
  }

  type User {
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    savedAnimes: [Anime]
  }

  type Query {
    animes: [Anime]
    anime(_id: ID!): Anime
    me: User
  }

  type Mutation {
    addUser(firstname: String!, lastname: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveAnime(_id: ID!, title_english: String, score: Int!, image: String): User
    removeAnime(_id: ID!): User
  }
`;

module.exports = typeDefs;
