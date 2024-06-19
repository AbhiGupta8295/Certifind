const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const resolvers = require('../resolvers')
const typeDefs = require('../typeDefs')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
require('dotenv').config();

if (process.env.NODE_ENV !== 'production') { 
    require('dotenv').config(); 
    } 
  
const app = express();
const port = process.env.PORT || 5001;
app.use(cors({origin:'*'}));
app.use(bodyParser.json());
app.use(express.json());
const router = express.Router();

async function startServer() {

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    


    await apolloServer.start();
    apolloServer.applyMiddleware({ app: app, path: '/.netlify/functions/api' });

    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log("connected to database: test (by default) -> collection name : certifind");
        })

    // app.listen(process.env.PORT || 5001, () => console.log(`Server running on http://localhost:${process.env.PORT }`));
    
    
}

startServer();
app.use('/.netlify/functions/api',router);
module.exports.handler = serverless(app);