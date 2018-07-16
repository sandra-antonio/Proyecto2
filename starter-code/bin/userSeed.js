require("dotenv").config();

const mongoose = require("mongoose");
const Users = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const salt = bcrypt.genSaltSync(bcryptSalt);
const hashPass = bcrypt.hashSync("1234", salt);

const dburl = "mongodb://localhost/proyecto2";
mongoose.connect(dburl).then(() => console.log(`Connected to db: ${dburl}`));

const profilePic = {
  pname: "person-icon",
  path: "uploads/person-icon.png",
  originalName: "person-icon"
};

Users.collection.drop();

Users.create([
  {
    profilePic,
    username: "cgarcia",
    name: "Carlos",
    surname: "García",
    email: "cgarcia@gmail.com",
    password: hashPass,
    dpto: "RRHH",
    workCenter: "Centro Madrid",
    dpt: "Tecnico PRL"
  },
  {
    profilePic,
    username: "ssanchez",
    name: "Sofía",
    surname: "Sánchez",
    email: "ssanchez@gmail.com",
    password: hashPass,
    dpto: "RRHH",
    workCenter: "Centro Madrid",
    dpt: "Aux. Administrativo"
  },
  {
    profilePic,
    username: "mreyes",
    name: "María",
    surname: "Reyes",
    email: "mreyes@gmail.com",
    password: hashPass,
    dpto: "Hacienda",
    workCenter: "Centro Barcelona",
    dpt: "Interventor General"
  },
  {
    profilePic,
    username: "jramos",
    name: "José",
    surname: "Ramos",
    email: "jramos@gmail.com",
    password: hashPass,
    dpto: "Economía y Empleo",
    workCenter: "Centro Barcelona",
    dpt: "Tesorero"
  },
  {
    profilePic,
    username: "mfernandez",
    name: "Marcos",
    surname: "Fernández",
    email: "mfernandez@gmail.com",
    password: hashPass,
    dpto: "Sanidad",
    workCenter: "Centro Valencia",
    dpt: "Coordinador Area Sanidad"
  },
  {
    profilePic,
    username: "smartin",
    name: "Samira",
    surname: "Martín",
    email: "smartin@gmail.com",
    password: hashPass,
    dpto: "Sanidad",
    workCenter: "Centro Valencia",
    dpt: "Aux. de Laboratorio"
  },
  {
    profilePic,
    username: "egomez",
    name: "Elena",
    surname: "Gómez",
    email: "egomez@gmail.com",
    password: hashPass,
    dpto: "Economía y Empleo",
    workCenter: "Centro Sevilla",
    dpt: "Orientador Laboral"
  },

  {
    profilePic,
    username: "agonzalez",
    name: "Alberto",
    surname: "González",
    email: "agonzalez@gmail.com",
    password: hashPass,
    dpto: "Economía y Empleo",
    workCenter: "Centro Bilbao",
    dpt: "Tec. Programas Empleo"
  }
]).then(() => {
  console.log("Users created");
  mongoose.disconnect();
});