const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    "Query to get all certificates for the home"
    allCertificates: [certificate]
    "Query to get certificate by title"
    certificateByTitle(Title:String!):certificate
    "Query to get certificate by Organisation"
    certificateByOrganisation(Organisation:String!):[certificate]
    "Query to get certificate by Category"
    certificateByCategory(Category:String!):[certificate]
    "Query to get stored certificate id"
    getCertificateIdByTitle(Title:String!):ID
  }

  type Mutation {
    "Pass Title, Organisation, Links, PreviewID, Category in order to create an entry"
    createCertificate(Title: String!, Organisation: String!, Links: String!, PreviewID: String!, Category: String! ): certificate
    "Pass Title, Organisation, Category to verify the certificate to be deleted" 
    deleteCertificate(Title: String!, Organisation: String!, Category: String! ): String
    "Pass _id of the certificate that is to be updated and give data to be replaced"
    updateCertificate(_id: String!, Title: String, Organisation: String, Links: String, PreviewID: String, Category: String ): certificate 
  }


  type certificate {
    Title: String
    Organisation: String
    Links: String
    PreviewID: String
    Category: String
  }
`;

module.exports = typeDefs;
