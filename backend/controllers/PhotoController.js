// Postando as fotos

const Photo = require ("../models/Photo");

const User = require ("../models/User");

const mongoose = require("mongoose");

// Inserindo foto com o usuário e seu relacionamento com a foto
const insertPhoto = async(req, res) => {

  const { title } = req.body;
  const image = req.file.filename;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  // Criando uma foto
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user.id,
    userName: user.name,
  });

  // Verificando se a foto foi criada com sucesso, retorna data;
  if(!newPhoto) {
    res.status(422).json({
      errors:["Houve um problema, por favor tente novamente mais tarde."],
    });
    return;

  }

  res.status(201).json(newPhoto);

};

// Excluindo uma fotos DB
const deletePhoto = async(req, res) =>{
  
  const { id } = req.params;

  const reqUser = req.user;

  try {
    
    const { ObjectId } = mongoose.Types;
    
    const photo = await Photo.findById(new ObjectId(id));
    
    // Verificado se foto existe
    if(!photo) {
      res.status(404).json({ errors:["Foto não encontrada!"] });
      return;
    }
    
    // Verifique se a foto pertence ao usuário
    if(!photo.userId.equals(reqUser._id)) {
      res.status(422)
      .json({errors:["Ocorreu um erro, por favor tente novamente mais tarde."]});
    }
    
    await Photo.findById(photo._id);
    
    res.status(200)
    .json({ id: photo._id, message: "Foto excluída com sucesso." });
  
  } catch (error) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  };

};

//Pegando todas as fotos
const getAllPhotos = async(req, res) => {

  const photos = await Photo.find({})
  .sort([["createdAt", -1]])
  .exec();

  return res.status(200).json(photos);
};

// Pegando fotos do usuário
const getUserPhotos = async (req, res) => {

  const { id } = req.params;

  const photos = await Photo.find({ userId: id })
  .sort([["createdAt", -1]])
  .exec();

  return res.status(200).json(photos);

};  

// Pegando foto por Id
const  getPhotoById = async (req, res) => {

  const { id } = req.params;

  const { ObjectId } = mongoose.Types;
  
  const photo = await Photo.findById(new ObjectId(id));

  // Verificando se foto existe
  if (!photo) {
    res.status(400).json({errors: ["Foto não encontrada."]});
    return;

  }

  res.status(200).json({ photo });

};

// Atualizando a Foto
const updatePhoto = async (req, res) => {

  const { id } = req.params;
  const { title } = req.body;

  const reqUser = req.user;

  const photo = await Photo.findById(id);

  // Verificando se a foto existe
  if (!photo) {
    res
    .status(404)
    .json({
      errors: ["Foto não encontrada."]
    });
    return;

  }

  // Verificar se foto é do usuário
  if(photo.userId.equals(reqUser._id)) {
    res
    .status(422)
    .json({
      errors:["Ocorreu um erro, por favor tente novamente mais tarde!"],
    });
    return;
  }

  // Verificando se título
  if(title) {
    photo.title = title;

  }

  await photo.save();

  res.status(200).json({ photo, message: "Foto atualizada com sucesso."});

};

// Função LIKE 
const likePhoto = async (req, res) => {

  const { id } = req.params;

  const reqUser = req.user;

  const photo = await Photo.findById(id);

  // Verificando Se Foto existe
  if(!photo) {
    res.status(400).json({ errors: ["Fotos não encontrada"] });

    return;
  };

  // Verificando se Usuário curtiu a foto
  if(!photo.likes.includes(reqUser._id)) {
    res.status(422).json({ errors: ["Você já curtiu a foto"] });
    return;
  };

  // Colocando os likes dentro do array do id do usuário 
  photo.likes.push(reqUser._id);

  photo.save();

  res.status(200).json({photoId: id, userId: reqUser._id, message: "A foto foi curtida"});

};

// Colocando os Comentários
const commentPhoto = async (req, res) => {

  const { id } = req.params;
  const { comment } = req.body;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  const photo = await Photo.findById(id);

// Verificação se foto existe
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada"]});
    return;
  };

  // Colocado o comentários no array
  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userId: user._id,
  };

  //Inserindo o comentário do usuário
  photo.comments.push(userComment);

  // Atualizando a foto 
  await photo.save();

  res.status(200).json({
    comment: userComment,
    message: "O comentário foi adicionado com sucesso!",
  });

};

// Procurando fotos por título
const searchPhotos = async (req, res) => {
  
  const { q } = req.query;

  const photos = await Photo.find({ title: new RegExp(q, "i")}).exec();

  res.status(200).json(photos);

}

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos,
};


