const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { typeDefs, resolvers } = require("./schemas/index");
const db = require("./config/connection");

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({

  typeDefs,

  resolvers,

});

async function serverStart () {
  const { url } = await startStandaloneServer(server, {

    listen: { port: PORT },

  });
  console.log(`Server ready at: ${url}`);
}

db.once("open", async () => {
  serverStart()
});
