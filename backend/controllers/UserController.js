// --- Autentificação do Usuário ---

const User = require("../models/User.js");

// Crytografia/Segurança;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Conexão ao Banco de Dados
const { default: mongoose } = require("mongoose");

// Sendo crytografado
const jwtSecret = process.env.JWT_SECRET;

// Gerar Token para Usuário
const generateToken = (id) => {
  return jwt.sign ({ id }, jwtSecret, {
    expiresIn: "7d",
  });
}; 

// Registro de Usuário e Sign in
const register = async (req, res) => {
  
  const { name, email, password } = req.body;

  // Verificação de usuário existente
  const user = await User.findOne({ email });

  if(user) {
    res.status(422).json({errors: ["Por favor, utilize outro e-mail."]});

    return;

  }

  //Gerador de senha Cryptografada;
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  // Criando o Usuário;
  const newUser = await User.create({
    name,
    email,
    password: passwordHash

  });  

  // Verificação se usuário foi criado
  // Gera um Token;
  if (!newUser) {
    res.status(422).json({
      errors: ["Houve um erro, por favor tente mais tarde."],
    });
    return;
  }
  
  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

//Usuário logado
const getCurrentUser = async (req, res) => {
  const user = req.user;

  res.status(200).json(user);

}

// Login do usuário
const login = async(req, res) => {

  const { email, password } = req.body;
  
  const user = await User.findOne({ email });

  // Verificação do usuário existe
  if (!user) {
    res.status (404).json({ errors: ["Usuário não encontrado."]});
    return;
  }

  // Verificação da senha do Usuário
  if(!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ errors: ["Senha Inválida!!!"]});
    return;
  }

  //Verificação se está correta do Usuário
  res.status(201).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  });
};

//Upadate do Usuário
const update = async (req, res) => {
  const { name, password, bio } = req.body;

  let profileImage = null;

  if (req.file) {
    profileImage = req.file.filename;
  }

   const reqUser = req.user;

   const { ObjectId } = mongoose.Types;
   
   const user = await User.findById( new ObjectId(reqUser._id)).select(
    "-password"
  );

  if(name) {
    user.name = name;
  } 

  if (password) {
    //Gerador de senha Cryptografada;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    user.password = passwordHash;
  }

  if(profileImage) {
    user.profileImage = profileImage;

  }

  if(bio) {
    user.bio = bio;
  }

  // Salvando no banco de dados
  
  await user.save();

  res.status(200).json(user);

};

// Localizar por usuário
const getUserById = async (req, res) => {

  const { id } = req.params;

  try {
    /* Sempre quando for consultar dados do MongoDB 
    criar um objeto conforme o exemplo abaixo:
    lembrar -> usar o new */
    
    const { ObjectId } = mongoose.Types;
   
    const user = await User.findById( new ObjectId(id)).select(
     "-password"
   );
      // Verificando se existe o usuário
      
      if(!user) {
        res.status(404).json({ errors: ["Usuário não encontrado"]});
        return;
      }
      
      res.status(200).json(user);
    
  }catch (error) {
    res.status(404).json({ errors: ["Usuário não encontrado"]});
    return;
    
  }

}

// exportando os objetos
module.exports = {
  register,
  login,
  getCurrentUser,
  update,
  getUserById,
};