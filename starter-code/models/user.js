const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const pictureSchema = Schema({
  name: String,
  path: String,
  originalName: String
}, {timestamps: {createdAt: "created_at", updatedAt: "updated_at"}});

const UserSchema = Schema({
  rol: { type: String, enum: ['Basico', 'Admin'], default: "Basico"},
  username: String,
  email:    String,
  password: String,
  profilePic: pictureSchema
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
