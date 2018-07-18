const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const UserSchema = Schema({
  profilePic: {
    pname: String,
    path: {type: String, default: "uploads/person-icon.png"},
    originalName: String
  },
  username: String,
  name: String,
  surname: String,
  isadmin: { type: Boolean, default: "False"},
  email:    String,
  password: String,
  dpto: {type : String, enum: ["RRHH","Hacienda", "Sanidad", "Economía y Empleo", "Admin"]},
  workCenter: {type:Schema.Types.ObjectId , ref:"workCenter"},
  dpt : {type:Schema.Types.ObjectId , ref:"Dpt"},
});

const User = mongoose.model('User', UserSchema);
const Picture = 

module.exports = User;
