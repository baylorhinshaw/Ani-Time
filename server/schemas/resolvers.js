const { User } = require('../models');

const resolvers = {
  Query: {
    animes: async () => {
      return User.find().populate('animes');
    },
    anime: async (parent, args) => {
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
  }
};

module.exports = resolvers;
