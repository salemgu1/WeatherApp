const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/wheatherApp")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("cant Connected to MongoDB", error));

const citySchema = new mongoose.Schema({
  name: String,
  temperature: Number,
  condition: String,
  conditionPic: String,
});

const City = mongoose.model("City", citySchema);
module.exports = City;
