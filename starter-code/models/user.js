const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const UserSchema = Schema({
  profilePic: {
    pname: String,
    path: String,
    originalName: String
  },
  username: String,
  name: String,
  surname: String,
  rol: { type: String, enum: ['Basico', 'Admin'], default: "Basico"},
  email:    String,
  password: String,
  dpto: {type : String, enum: ["RRHH","Hacienda", "Sanidad", "Economía y Empleo", "Admin"]},
  workCenter: { type: String, enum: ["Centro Madrid", "Centro Barcelona", "Centro Valencia", "Centro Sevilla", "Centro Bilbao"]},
  dpt : { 
    type : String, 
    enum: ["Admin", "Tecnico PRL", "Aux. Administrativo", "Interventor General", "Tesorero", "Coordinador Area Sanidad", "Aux. de Laboratorio", "Orientador Laboral", "Tec. Programas Empleo"]
  }
});

const User = mongoose.model('User', UserSchema);
const Picture = 

module.exports = User;
