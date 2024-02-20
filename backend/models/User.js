// --- Modal do Usuário: ---

const mongoose = require("mongoose");
const { Schema } = mongoose;

// Criando Objeto usuário para Cadastro e Login
const userSchema = new Schema(
  {
  name: String,
  email: String,
  password: String,
  profileImage: String,
  bio: String,
},
{ // Registra tempo do usuário;
  timestamps: true
}
);

//Definição do model
const User = mongoose.model("User", userSchema);

module.exports = User;

