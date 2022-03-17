const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (_parent, args, context) => {
            if (context.user) {
                const foundUser = await User.findOne({_id: context.user._id})
                    .populate('books');

                    return foundUser;
            }
            throw new AuthenticationError('Not logged in');
        },
    },

    Mutation: {
        login: async (_parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },

        addUser: async (_parent, { username, email, password }) => {
            const user = await User.create({ username,  email, password });
            const token = signToken(user);

            return { token, user };
        }
    }
};

module.exports = resolvers;