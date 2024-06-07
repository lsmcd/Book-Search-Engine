const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {

    Query: {
  
      users: async () => await User.find({}),
      me: async (_, { userID }) => await User.findById(userID)
  
    },
    
    Mutation: {

      createUser: async (_, { username, email, password}) => {
        const user = await User.create({username, email, password})
        if (user) {
          const token = signToken(user);
          return {token, user};
        } else {
          return "Failed to create user";
        }
      },

      login: async(_, {email, password}) => {
        const user = await User.findOne({email: email})
        console.log(user, password)
        if (await user.isCorrectPassword(password)) {
          const token = signToken(user);
          return {token, user};
        } else {
          return AuthenticationError;
        }
      }

    }
  
};

module.exports = resolvers;