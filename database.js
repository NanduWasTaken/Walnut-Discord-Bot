const mongoose = require("mongoose");
const config = require("./config");

mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "[❌] Mongo DB Error: "));
db.once("open", function () {
  console.log("[✅] MongoDB is Online!");
});
