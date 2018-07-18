require("dotenv").config();

const mongoose = require("mongoose");
const WorkCenter = require("../models/workCenter");
const bcrypt = require("bcrypt");
const dburl = process.env.DBURLP;
mongoose.connect(dburl).then(() => console.log(`Connected to db: ${dburl}`));

WorkCenter.collection.drop();

WorkCenter.create([
  {
    name: "Centro Madrid",
    description: "Centro de trabajo en Madrid.",
    coordinates: [40.4126135,-3.7070219]
  },
  {
    name: "Centro Barcelona",
    description: "Centro de trabajo en Barcelona.",
    coordinates: [41.3895721,2.1875499]
  },
  {
    name: "Centro Valencia",
    description: "Centro de trabajo en Valencia.",
    coordinates: [39.480775, -0.323330]
  },
  {
    name: "Centro Sevilla",
    description: "Centro de trabajo en Sevilla.",
    coordinates: [37.3861826,-5.9948024]
  },
  {
    name: "Centro Bilbao",
    description: "Centro de trabajo en Bilbao.",
    coordinates: [43.2627089,-2.9417931]
  }
]).then(() => {
  console.log("Centers created");
  mongoose.disconnect();
});
