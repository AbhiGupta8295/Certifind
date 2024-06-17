const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const resolvers = require('../resolvers')
const typeDefs = require('../typeDefs')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

async function startServer() {
    const app = express();
    app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
    credentials: false // Do not allow credentials
}));
    app.use(bodyParser.json());
    app.use(express.json());

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app: app, path: '/' });

    mongoose.connect(process.env.MONGO_URI || "mongodb+srv://admin:admin@cluster0.yb17mkv.mongodb.net/", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log("connected to database: test (by default) -> collection name : certifind");
        })

    // app.listen(process.env.PORT || 5001, () => console.log(`Server running on http://localhost:${process.env.PORT }`));
    app.use('/.netlify/functions/api',router);

}

startServer();
