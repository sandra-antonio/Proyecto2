require("dotenv").config();

const mongoose = require("mongoose");
const Users = require("../models/user");
const WorkCenter = require("../models/workCenter");
const Dpt = require("../models/dpt")
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const salt = bcrypt.genSaltSync(bcryptSalt);
const hashPass = bcrypt.hashSync("1234", salt);
const dburl = process.env.DBURLP;
mongoose.connect(dburl).then(() => {
  console.log(`Connected to db: ${dburl}`)

  const profilePic = {
    pname: "person-icon",
    path: "uploads/person-icon.png",
    originalName: "person-icon"
  };
  
  Users.collection.drop();
  WorkCenter.find({})
  .then(workcenter => {
    console.log(workcenter)
    Dpt.find({})
    .then(dpt => {
      console.log(dpt)
    Users.create([
      {
        profilePic,
        username: "snajera",
        name: "Sandra",
        surname: "Najera",
        isadmin: true,
        email: "snajera@gmail.com",
        password: hashPass,
        dpto: "Admin",
        workCenter: workcenter[0]._id,
        dpt: dpt[0]._id
      },
      {
        profilePic,
        username: "aesteban",
        name: "Antonio",
        surname: "Esteban",
        isadmin: true,
        email: "aesteban@gmail.com",
        password: hashPass,
        dpto: "Admin",
        workCenter: workcenter[1]._id,
        dpt: dpt[1]._id
      },
      {
        profilePic,
        username: "cgarcia",
        name: "Carlos",
        surname: "García",
        email: "cgarcia@gmail.com",
        password: hashPass,
        dpto: "RRHH",
        workCenter: workcenter[2]._id,
        dpt: dpt[0]._id
      },
      {
        profilePic,
        username: "ssanchez",
        name: "Sofía",
        surname: "Sánchez",
        email: "ssanchez@gmail.com",
        password: hashPass,
        dpto: "RRHH",
        workCenter: workcenter[3]._id,
        dpt: dpt[1]._id
      },
      {
        profilePic,
        username: "mreyes",
        name: "María",
        surname: "Reyes",
        email: "mreyes@gmail.com",
        password: hashPass,
        dpto: "Hacienda",
        workCenter: workcenter[2]._id,
        dpt: dpt[0]._id
      },
      {
        profilePic,
        username: "jramos",
        name: "José",
        surname: "Ramos",
        email: "jramos@gmail.com",
        password: hashPass,
        dpto: "Economía y Empleo",
        workCenter: workcenter[3]._id,
        dpt: dpt[1]._id
      },
      {
        profilePic,
        username: "mfernandez",
        name: "Marcos",
        surname: "Fernández",
        email: "mfernandez@gmail.com",
        password: hashPass,
        dpto: "Sanidad",
        workCenter: workcenter[1]._id,
        dpt: dpt[0]._id
      },
      {
        profilePic,
        username: "smartin",
        name: "Samira",
        surname: "Martín",
        email: "smartin@gmail.com",
        password: hashPass,
        dpto: "Sanidad",
        workCenter: workcenter[3]._id,
        dpt: dpt[1]._id
      },
      {
        profilePic,
        username: "egomez",
        name: "Elena",
        surname: "Gómez",
        email: "egomez@gmail.com",
        password: hashPass,
        dpto: "Economía y Empleo",
        workCenter: workcenter[3]._id,
        dpt: dpt[0]._id
      },
    
      {
        profilePic,
        username: "agonzalez",
        name: "Alberto",
        surname: "González",
        email: "agonzalez@gmail.com",
        password: hashPass,
        dpto: "Economía y Empleo",
        workCenter: workcenter[2]._id,
        dpt: dpt[1]._id
      },
      {
        profilePic,
        username: "iperez",
        name: "Isidoro",
        surname: "Pérez",
        email: "iperez@gmail.com",
        password: hashPass,
        dpto: "Economía y Empleo",
        workCenter: workcenter[0]._id,
        dpt: dpt[0]._id
      },
      {
        profilePic,
        username: "framirez",
        name: "Federico",
        surname: "Ramirez",
        email: "framirez@gmail.com",
        password: hashPass,
        dpto: "Economía y Empleo",
        workCenter: workcenter[0]._id,
        dpt: dpt[1]._id
      },
      {
        profilePic,
        username: "agirauta",
        name: "Asensio",
        surname: "Girauta",
        email: "agirauta@gmail.com",
        password: hashPass,
        dpto: "Economía y Empleo",
        workCenter: workcenter[1]._id,
        dpt: dpt[0]._id
      },
      {
        profilePic,
        username: "pgrillo",
        name: "Pepito",
        surname: "Grillo",
        email: "pgrillo@gmail.com",
        password: hashPass,
        dpto: "Sanidad",
        workCenter: workcenter[1]._id,
        dpt: dpt[0]._id
      },
      {
        profilePic,
        username: "pbotella",
        name: "Pepe",
        surname: "Botella",
        email: "pbotella@gmail.com",
        password: hashPass,
        dpto: "RRHH",
        workCenter: workcenter[2]._id,
        dpt: dpt[1]._id
      },
      {
        profilePic,
        username: "dgil",
        name: "Dulcinea",
        surname: "Gil",
        email: "dgil@gmail.com",
        password: hashPass,
        dpto: "Hacienda",
        workCenter: workcenter[2]._id,
        dpt: dpt[0]._id
      },
      {
        profilePic,
        username: "mrajoy",
        name: "María",
        surname: "Rajoy",
        email: "mrajoy@gmail.com",
        password: hashPass,
        dpto: "Hacienda",
        workCenter: workcenter[3]._id,
        dpt: dpt[1]._id
      },
      {
        profilePic,
        username: "amartinez",
        name: "Ana",
        surname: "Martínez",
        email: "amartinez@gmail.com",
        password: hashPass,
        dpto: "Sanidad",
        workCenter: workcenter[3]._id,
        dpt: dpt[0]._id
      },
      {
        profilePic,
        username: "tlorca",
        name: "Teresa",
        surname: "Lorca",
        email: "tlorca@gmail.com",
        password: hashPass,
        dpto: "Hacienda",
        workCenter: workcenter[4]._id,
        dpt: dpt[0]._id
      },
      {
        profilePic,
        username: "ptenso",
        name: "Pedro",
        surname: "Tenso",
        email: "ptenso@gmail.com",
        password: hashPass,
        dpto: "RRHH",
        workCenter: workcenter[0]._id,
        dpt: dpt[1]._id
      },
      {
        profilePic,
        username: "mrios",
        name: "Manolo",
        surname: "Rios",
        email: "mrios@gmail.com",
        password: hashPass,
        dpto: "RRHH",
        workCenter: workcenter[2]._id,
        dpt: dpt[1]._id
      },
      {
        profilePic,
        username: "ltuerto",
        name: "Lilo",
        surname: "Tuerto",
        email: "ltuerto@gmail.com",
        password: hashPass,
        dpto: "Sanidad",
        workCenter: workcenter[4]._id,
        dpt: dpt[1]._id
      },
      {
        profilePic,
        username: "srojas",
        name: "Sara",
        surname: "Rojas",
        email: "srojas@gmail.com",
        password: hashPass,
        dpto: "Sanidad",
        workCenter: workcenter[4]._id,
        dpt: dpt[0]._id
      },
    ]).then(() => {
      console.log("Users created");
      mongoose.disconnect();
    })
    .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  })
})


