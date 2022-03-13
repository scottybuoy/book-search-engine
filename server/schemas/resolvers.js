const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (_parent, args, context) => {
            if (context.user) {
                const foundUser = await User.findOne({_id: context.user._id})
                    .populate('books');

                    return foundUser;
            }
            throw new AuthenticationError('Not logged in');
        },
    },

    Mutation: {
        
    }
}

module.exports = resolvers;