const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs')
const express = require('express');

require('dotenv').config();

async function startServer() {
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await apolloServer.start();
    app.use(express.json());
    apolloServer.applyMiddleware({ app: app, path: '/' });

    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log("connected to database: test (by default) -> collection name : certifind");
        })

    app.listen(process.env.PORT, () => console.log(`Server running on http://localhost:${process.env.PORT}`));
}

startServer();