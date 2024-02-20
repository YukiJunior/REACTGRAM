const mongoose = require("mongoose");
const { Schema } = mongoose;

// Criando Objeto photo para postagem
const photoSchema = new Schema(
  {
    imagem: String,
    title: String,
    likes: Array,
    comments: Array,
    userId: mongoose.ObjectId,
    userName: String,
  },
  { // Registra tempo do usuário
    timestamps: true,
  }
  );
  
  const Photo = mongoose.model("Photo",photoSchema);

  module.exports = Photo;