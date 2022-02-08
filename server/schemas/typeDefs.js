const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    
  }

  type User {
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    savedAnimes: [Anime]
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
    saveAnime(_id: ID!, title_english: String, score: Int!, image: String): User
    removeAnime(_id: ID!): User
  }
`;

module.exports = typeDefs;
