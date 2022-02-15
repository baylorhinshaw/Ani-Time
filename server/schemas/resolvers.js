const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');


const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('animes');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('animes');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    addUser: async (parent, { firstname, lastname, email, password }) => {
      const user = await User.create({ firstname, lastname, email, password });
      const token = signToken(user);

      return {token, user}
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    saveAnime: async (parent, args, context ) => {
      if (context.user) {
   
      return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedAnimes: args }},
          { new: true, runValidators: true }
       )
      }
    },
    removeAnime: async (parent, {mal_id}, context ) => {
      if(context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedAnimes: { mal_id: mal_id } } },
          { new: true }
          );
      }
    },
    changePassword: async (parent, {password}, context ) => {
      if(context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { password: password },
          { new: true }
          );
      }
    },
  }
};

module.exports = resolvers;
