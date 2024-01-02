const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');
const express = require('express');

require('dotenv').config();


    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true,  // Enable introspection for Apollo Studio
        playground: true,     // Enable GraphQL Playground
    });

    await apolloServer.start();
    app.use(express.json());
    apolloServer.applyMiddleware({ app, path: '/' });

    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

    const port = process.env.PORT || 5000; // Use PORT environment variable or default to 5000
    // app.listen(port, () => {
    //     console.log(`Server running on http://localhost:${port}`);
    // });

exports.handler = apolloServer.creteHandler();