const { ApolloServer } = require("@apollo/server");
const { typeDefs, resolvers } = require("./schemas/index");
const { expressMiddleware } = require("@apollo/server/express4");

const db = require("./config/connection");

const express = require("express");
const path = require("path");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

const { authMiddleware } = require("./utils/auth");

const server = new ApolloServer({

  typeDefs,

  resolvers,

});

async function serverStart () {

  await server.start();
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use('/graphql', express.json(), expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once("open", async () => {
    app.listen(PORT, () => {
      console.log(`Server running at port: ${PORT}`);
      console.log(`GraphQL sandbox running at: http://localhost:${PORT}/graphql`);
    });
  });
}

serverStart()