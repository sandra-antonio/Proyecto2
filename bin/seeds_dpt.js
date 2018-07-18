require("dotenv").config();

const mongoose = require("mongoose");
const dpt = require("../models/dpt");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const salt = bcrypt.genSaltSync(bcryptSalt);
const hashPass = bcrypt.hashSync("1234", salt);
const dburl = process.env.DBURLP;
mongoose.connect(dburl).then(() => {
  console.log(`Connected to db: ${dburl}`);

  dpt.collection.drop();

  dpt
    .create([
      {
        Denom: "Aux. Admvo. RRHH",
        Area: "RRHH",
        Colectivo: "Personal Funcionario",
        Mision:
          "Ejecutar las tareas sencillas y auxiliares, relativas a la gestión de personal municipal",
        Funciones: [
          "Realizar la tramitación propia de los procedimientos selectivos de los empleados: confeccionar bases de selección, publicarlas, registro de instancias, actas publicación de resultados, etc.",
          "Elaborar expedientes de plantilla presupuestaria, actualizaciones, modificaciones y variaciones."
        ],
        Tareas: {
          tipo: "Derivadas de las Funciones Propias",
          resultado: "Conseguir los fines y objetivos marcados",
          dedicacion: "100%"
        },
        Formacion: {
          titulo: "Graduado, Formación Profesional I, o equivalente",
          idiomas: "Inglés",
          experiencia: "Menos 1 año",
          habilidades:
            "Comunicación asertiva, Gestión del conflicto, Confidencialidad y ética"
        },
        ResAut: {
          NivRes: 1,
          Colaboradores: "No",
          NivSuperv: 5
        },
        Condiciones: {
          turnicidad: "Sí",
          Colaboradores: "No",
          nocturnidad: "No",
          peligro: "No"
        }
      },
      {
        Denom: "Técnico PRL",
        Area: "RRHH",
        Colectivo: "Laboral",
        Mision:
          "Llevar a cabo las funciones y tareas asignadas al Servicio de Prevención Propio del Ayuntamiento",
        Funciones: [
          "Las propias del Servicio de Prevención Propio del Ayuntamiento (especialidades de seguridad en el trabajo, higiene industrial y ergonomía y psicosociología aplicada), en cumplimiento de la Ley 31/1995, Ley de prevención de riesgos laborales, y normativa que la desarrolla, en particular el R.D. 39/1997, Reglamento de los servicios de prevención, capítulo VI.",
          "Gestión de los contratos de servicio que dependen del Dto: vigilancia de la salud, apoyo a la coordinación de actividades empresariales, etc"
        ],
        Tareas: {
          tipo: "Derivadas de las Funciones Propias",
          resultado: "Conseguir los fines y objetivos marcados",
          dedicacion: "100%"
        },
        Formacion: {
          titulo: "Diplomado, ingeniero o arquitecto técnico o equivalente",
          idiomas: "Inglés",
          experiencia: "Mas 5 años",
          habilidades: ""
        },
        ResAut: {
          NivRes: 3,
          Colaboradores: "Sí",
          NivSuperv: 2
        },
        Condiciones: {
          turnicidad: "Sí",
          Colaboradores: "Sí",
          nocturnidad: "No",
          peligro: "No"
        }
      }
    ])
    .then(() => {
      console.log("Dpts created");
      mongoose.disconnect();
    })
    .catch(err => console.log(err))
});
