const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const resolvers = require('../resolvers')
const typeDefs = require('../typeDefs')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();
const app = express();
app.use(cors({origin:'*'}));

async function startServer() {

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    
    app.use(bodyParser.json());
    app.use(express.json());

    await apolloServer.start();
    apolloServer.applyMiddleware({ app: app, path: '/' });

    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log("connected to database: test (by default) -> collection name : certifind");
        })

    app.listen(process.env.PORT || 5001, () => console.log(`Server running on http://localhost:${process.env.PORT }`));
    
    // app.use('/.netlify/functions/api');

}

startServer();
