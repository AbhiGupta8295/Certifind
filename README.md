Deployed on Netlify: https://zesty-malabi-f16553.netlify.app/.netlify/functions/api
 
 # Certifind

Certifind is a Node.js and MongoDB application that allows users to create and manage certificates. It uses the Apollo Server framework for GraphQL and Mongoose for MongoDB.

## Prerequisites

To run this application, you will need the following:

* Node.js (version 16 or higher)
* MongoDB (version 4 or higher)
* Apollo Server (version 3 or higher)
* Mongoose (version 6 or higher)

## Installation

1. Clone the repository:

```
git clone https://github.com/AbhiGupta8295/Certifind.git
```

2. Install the dependencies:

```
npm install
```

## Configuration

1. Create a `.env` file in the root directory of the project and add the following environment variables:

```
MONGO_URI=mongodb://localhost:27017/test
PORT=3000
```

2. Replace `mongodb://localhost:27017/test` with the connection string for your MongoDB database.
3. Replace `3000` with the port you want the application to listen on.

## Running the Application

To run the application, run the following command:

```
npm start
```

The application will start and listen on port 3000.

## Code Overview

The application consists of the following files:

* `index.js`: The main entry point of the application.
* `resolvers.js`: The GraphQL resolvers.
* `typeDefs.js`: The GraphQL type definitions.
* `.env`: The environment variables file.

### index.js

The `index.js` file is the main entry point of the application. It does the following:

1. Imports the necessary modules.
2. Creates an Apollo Server instance.
3. Connects to the MongoDB database.
4. Starts the Express server.

### resolvers.js

The `resolvers.js` file contains the GraphQL resolvers. Resolvers are functions that are used to resolve GraphQL queries and mutations.

The following is an example of a resolver:

This resolver is used to resolve the `certificates` query. It returns all the certificates in the database
when the `certificates` query is made by a client.

### Queries

The following queries are available:

* `allCertificates`: This query returns all certificates in the system.
* `certificateByTitle`: This query returns the certificate with the specified title.
* `certificateByOrganisation`: This query returns all certificates from the specified organisation.
* `certificateByCategory`: This query returns all certificates in the specified category.
* `getCertificateIdByTitle`: This query returns the ID of the certificate with the specified title.

### Mutations

The following mutations are available:

* `createCertificate`: This mutation creates a new certificate.
* `deleteCertificate`: This mutation deletes the certificate with the specified title, organisation, and category.
* `updateCertificate`: This mutation updates the certificate with the specified ID.

