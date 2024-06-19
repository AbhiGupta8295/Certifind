const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const resolvers = require('../resolvers')
const typeDefs = require('../typeDefs')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

async function startServer() {

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    
    const app = express();
    app.use(bodyParser.json());
    app.use(express.json());
    app.use(cors({origin:'http://localhost:3000'}));

    await apolloServer.start();
    apolloServer.use(cors({origin:'http://localhost:3000'}));
    apolloServer.applyMiddleware({ app: app, path: '/' });

    mongoose.connect(process.env.MONGO_URI || "mongodb+srv://admin:admin@cluster0.yb17mkv.mongodb.net/", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log("connected to database: test (by default) -> collection name : certifind");
        })

    // app.listen(process.env.PORT || 5001, () => console.log(`Server running on http://localhost:${process.env.PORT }`));
    // app.listen('https://reliable-jalebi-fa3277.netlify.app/')
    app.use('/.netlify/functions/api');

}

startServer();
