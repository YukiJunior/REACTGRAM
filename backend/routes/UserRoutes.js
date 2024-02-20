// Rotas dos Usuários

const express = require("express");
const router = express.Router();

// Chamando o Controller
const { 
  register, 
  login, 
  getCurrentUser, 
  update,
  getUserById,
 } = require("../controllers/UserController");

// Validador (middlewares) 
const validate = require("../middlewares/handleValidation");
const { 
  userCreateValidation, 
  loginValidation, 
  userUpdateValidation,
 } = require("../middlewares/userValidations");
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpdate");


// =====> Chamando as Rotas <======

// -------> Rotas que Enviam Dados: <------------- 
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);

//--------> Rota que  Carregamento Dados: <-------------
router.get("/profile", authGuard, getCurrentUser);

// -------> Rota de Atualização <----------
router.put(
  "/", 
  authGuard, 
  userUpdateValidation(), 
  validate,
  imageUpload.single("profileImage"),
  update);

  // -----> Rota de Busca <-------
  router.get("/:id", getUserById);


module.exports = router;
