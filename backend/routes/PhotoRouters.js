//  Criação de Rotas paras as fotos

const express =  require("express");
const router = express.Router();

// Controller  imports
const { 
  insertPhoto, 
  deletePhoto, 
  getAllPhotos, 
  getUserPhotos, 
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos,
} = require("../controllers/PhotoController");

// Middlewares impors
const { 
  photoInsertValidation, 
  photoUpdateValidation, 
  commentValidation,
 } = require("../middlewares/photoValidations");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const { imageUpload } = require("../middlewares/imageUpdate");


// Routes
// Rota de Postagem de fotos;
router.post("/", 
authGuard, 
imageUpload.single("image"), 
photoInsertValidation(), 
validate,
insertPhoto,
);

// Rota delete das fotos:
router.delete("/:id", authGuard, deletePhoto);

// Rota pegando todas as fotos
router.get("/", authGuard,getAllPhotos);

// Rota pegando Fotos do usuário
router.get("/user/:id", authGuard, getUserPhotos);

// Rota Consulta de fotos por títulos
router.get("/search", authGuard, searchPhotos);

// Rota pegando Foto pelo id
router.get("/:id", authGuard, getPhotoById)

// Rota Atualização de foto 
router.put("/:id", authGuard, photoUpdateValidation(), validate, updatePhoto);

// Rota do Likes
router.put("/like/:id",authGuard, likePhoto);

// Rota dos Comentários
router.put("/comment/:id", authGuard, commentValidation(), validate, commentPhoto);





module.exports = router;
