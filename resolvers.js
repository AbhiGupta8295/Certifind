const Certificate = require('./models/certificate.js');

const resolvers = {
  Query: {
    allCertificates: async () => {
      return await Certificate.find();
    },
    certificateByTitle: async (_, { Title }) => {
      try {
        const certificates = await Certificate.findOne({ Title: Title });

        if (certificates.length === 0) {
          window.alert("Not Found");
        }

        return certificates;
      } catch (error) {
        console.error("Error fetching certificates:", error.message);
        throw new Error("Internal server error");
      }
    },
    certificateByOrganisation: async (_, { Organisation }) => {
      try {
        const certificates = await Certificate.find({ Organisation: Organisation });

        if (certificates.length === 0) {
          window.alert("Not Found");
        }

        return certificates;
      } catch (error) {
        console.error("Error fetching certificates:", error.message);
        throw new Error("Internal server error");
      }
    },
    certificateByCategory: async (_, { Category }) => {
      try {
        const certificates = await Certificate.find({ Category: Category });

        if (certificates.length === 0) {
          window.alert("Not Found");
        }

        return certificates;
      } catch (error) {
        console.error("Error fetching certificates:", error.message);
        throw new Error("Internal server error");
      }
    },
    getCertificateIdByTitle: async (_, { Title }) => {

      const certificate = await Certificate.findOne({ Title });
      return certificate._id;
    }
  },

  Mutation: {
    createCertificate: async (parent, args, context, info) => {
      const { Title, Organisation, Links, PreviewID, Category } = args;
      const certificate = new Certificate({ Title, Organisation, Links, PreviewID, Category });
      await certificate.save();
      return certificate;
    },
    deleteCertificate: async (_, args) => { // both this and previous style passing arguments are correct
      const { Title, Organisation, Category } = args;
      // if certificate found with input details, it will be deleted
      let found = await Certificate.deleteOne({ Title, Organisation, Category });
      return "Successfully Deleted";
    },
    updateCertificate: async (_, args) => {
      const { _id, Title, Organisation, Links, PreviewID, Category } = args;
      let found = await Certificate.findByIdAndUpdate(
        _id,
        { Title: Title, Organisation: Organisation, Links: Links, PreviewID: PreviewID, Category: Category },
        { new: true });
      return found;
    }
  },
};

module.exports = resolvers;
