require("dotenv").config();

const mongoose = require("mongoose");
const WorkCenter = require("../models/workCenter");
const bcrypt = require("bcrypt");
const dburl = "mongodb://localhost/proyecto2";
mongoose.connect(dburl).then(() => console.log(`Connected to db: ${dburl}`));

WorkCenter.collection.drop();

WorkCenter.create([
  {
    name: "",
    description: "",
    location
  },
  {
    name: "",
    description: "",
    location
  },
  {
    name: "",
    description: "",
    location
  },
  {
    name: "",
    description: "",
    location
  },
  {
    name: "",
    description: "",
    location
  }
]).then(() => {
  console.log("Users created");
  mongoose.disconnect();
});
