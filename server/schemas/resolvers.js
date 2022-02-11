const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');


const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('animes');
    },
    user: async (parent, args) => {
      return User.findOne({_id: args._id}).populate('animes')
    },
    me: async (parent, args, context) => {
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
      console.log(user)

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
      console.log(context.user)
      console.log(args)
      if (context.user) {
   
      return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedAnimes: args }},
          { new: true, runValidators: true }
       )
      }
    },
    removeAnime: async (parent, {mal_id}, context ) => {
      console.log(mal_id)
      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedAnimes: { mal_id: mal_id } } },
        { new: true }
        );
    },
  }
};

module.exports = resolvers;
