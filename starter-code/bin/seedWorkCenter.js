require("dotenv").config();

const mongoose = require("mongoose");
const WorkCenter = require("../models/workCenter");
const bcrypt = require("bcrypt");
const dburl = "mongodb://localhost/proyecto2";
mongoose.connect(dburl).then(() => console.log(`Connected to db: ${dburl}`));

WorkCenter.collection.drop();

WorkCenter.create([
  {
    name: "Centro Madrid",
    description: "Centro de trabajo en Madrid. Dedicado a ...",
    location: [40.6056677, -3.7218051]
  },
  {
    name: "Centro Barcelona",
    description: "Centro de trabajo en Barcelona. Dedicado a ...",
    location: [41.3825153, 2.1750194]
  },
  {
    name: "Centro Valencia",
    description: "Centro de trabajo en Valencia. Dedicado a ...",
    location: [9.4697992, -0.3791969]
  },
  {
    name: "Centro Sevilla",
    description: "Centro de trabajo en Sevilla. Dedicado a ...",
    location: [37.3843612, -6.0161532]
  },
  {
    name: "Centro Bilbao",
    description: "Centro de trabajo en Bilbao. Dedicado a ...",
    location: [43.2641428, -2.925712]
  }
]).then(() => {
  console.log("Users created");
  mongoose.disconnect();
});
