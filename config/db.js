const mongoose = require("mongoose");
const dns = require("dns").promises;

const atlasMongoURI = process.env.atlasMONGO_URI;
const localMongoURI = process.env.localMONGO_URI;

async function checkInternet() {
  try {
    await dns.lookup("google.com");
    return true;
  } catch (err) {
    return false;
  }
}

const connectDB = async () => {
  try {
    const isConnected = await checkInternet();
    // const mongo = localMongoURI
    // await mongoose.connect(mongo);
    const mongo = isConnected ? atlasMongoURI : localMongoURI
    await mongoose.connect(mongo);
    console.log(`Connected to MongoDB successfully using: ${isConnected ? 'MongoDB Atlas': 'Local MongoDb'}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
