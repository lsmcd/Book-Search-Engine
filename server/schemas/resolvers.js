const { User } = require("../models");

const resolvers = {

    Query: {
  
      users: async () => await User.find({}),
      getSingleUser: async (_, { userID }) => await User.findById(userID)
  
    }
  
};

module.exports = resolvers;