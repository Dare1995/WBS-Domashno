const mongoose = require("mongoose");

const uri =
  "mongodb+srv://Darko74:Darecar23081995@cluster0.n4xdqhm.mongodb.net/accounts?retryWrites=true&w=majority&appName=Cluster0";

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected!");
  } catch (err) {
    console.error(err);
  }
}

// connect();
module.exports = connect;