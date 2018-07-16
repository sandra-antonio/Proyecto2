const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dptSchema = new Schema({
  Denom: String,
  Area: { type: Schema.Types.ObjectId, ref: 'User' },
  Area: { type: String, enum: ['RRHH','Hacienda', 'Sanidad', 'Economía y Empleo']},
  Colectivo: { type: String, enum: ['Laboral','Personal Funcionario']},
  Mision: String,
  Funciones: [],
  Tareas: [
    {
     tipo: String,
     resultado: String,
     dedicacion: String
    }
  ],
  Formacion: [
    {
     titulo: String,
     idiomas: String,
     experiencia: { type: String, enum: ['Menos 1 año','3-5 años', 'Mas 5 años']},
      habilidades: String
    }
  ],
  ResAut: [
    {
     NivRes: { type: Number, enum: [1,2,3,4,5]},
     Colaboradores: { type: String, enum: ['Sí', 'No']},
     NivSuperv: { type: Number, enum: [1,2,3,4,5]},
    }
  ],
  Condiciones: [
    {
    turnicidad: { type: String, enum: ['Sí', 'No']},     Colaboradores: { type: String, enum: ['Sí', 'No']},
    nocturnidad: { type: String, enum: ['Sí', 'No']},     Colaboradores: { type: String, enum: ['Sí', 'No']},
    peligro: { type: String, enum: ['Sí', 'No']},     Colaboradores: { type: String, enum: ['Sí', 'No']},
    }
  ]
});

const Dpt = mongoose.model('Dpt', dptSchema);
module.exports = Dpt;