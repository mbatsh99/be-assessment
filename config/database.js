const mongoose = require("mongoose");

exports.connect = () => {
  // Connecting to the database

  MONGO_URI =
    "mongodb+srv://mbatsh99:Mbatsh191718@cluster0.k7k7h4n.mongodb.net/?retryWrites=true&w=majority";
  mongoose
    .connect(MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      // useruseFindAndModify: false,
    })
    .then(() => {})
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};
