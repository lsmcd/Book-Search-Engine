const { User } = require("../models");
const { link } = require("../routes");
const { signToken, AuthenticationError } = require("../utils/auth");
const jwt = require('jsonwebtoken');

const resolvers = {

    Query: {
  
      users: async () => await User.find({}),
      me: async (_, {}, context) => await User.findById(context.user._id)
  
    },
    
    Mutation: {

      addUser: async (_, { username, email, password}) => {
        const user = await User.create({username, email, password})
        if (user) {
          const token = signToken(user);
          return {token, user};
        } else {
          return "Failed to create user";
        }
      },

      loginUser: async(_, {email, password}) => {
        const user = await User.findOne({email: email})
        console.log(user, password)
        if (await user.isCorrectPassword(password)) {
          const token = signToken(user);
          return {token, user};
        } else {
          return AuthenticationError;
        }
      },

      saveBook: async (_, { userId, ...book}, context) => {
        if (context.user) {
          const user = await User.findById(context.user._id);
          user.savedBooks.push(book);
          user.save();
          return user;
        }
        throw AuthenticationError;
      },
      
      removeBook: async (_, { bookId }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId: bookId } } },
            { new: true }
          );
          return updatedUser;
        }
        throw AuthenticationError;
      }
    }
  
};

module.exports = resolvers;