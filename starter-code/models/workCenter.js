const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wCenterSchema = new Schema({
  name: { type: String, enum: ["Centro Madrid", "Centro Barcelona", "Centro Valencia", "Centro Sevilla", "Centro Bilbao"]},
  description: String,
  location: { type: { type: String }, coordinates: [Number] }
});

//wCenterSchema.index({
//  location: '2dsphere'
//});

const Center = mongoose.model('Center', wCenterSchema);
module.exports = Center;
