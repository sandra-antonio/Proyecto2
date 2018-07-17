const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wCenterSchema = new Schema({
  name: String,
  description: String,
  coordinates: [Number] 
});

//wCenterSchema.index({
//  location: '2dsphere'
//});

const workCenter = mongoose.model('workCenter', wCenterSchema);
module.exports = workCenter;
