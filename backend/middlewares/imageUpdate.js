//--- Upload de imagens ---

const multer = require("multer");
const path = require("path");

// Destino armazenamento da imagem
const imageStore = multer.diskStorage({
  destination: (req,file,cb) => {
    let folder = "";

    if(req.baseUrl.includes("users")){
      folder = "users";
    }
    else if(req.baseUrl.includes("photos")){
      folder = "photos";
    }
    // cb = CALLBACK
    cb(null,`uploads/${folder}/`);

  },
  //mudança do nome do arquivo
  filename: (req,file,cb) =>{
   
    // vai informar nome da imagem extensão
    cb(null,Date.now() + path.extname(file.originalname));

  }
})

// Validação da imagem e definir aonde será postada
const imageUpload = multer({
  storage: imageStore,
  fileFilter: (req,file,cb) => {
    if(file.originalname.match(/\.(png|jpg) $/ )) {

      // Upload no formato png ou jpg
      return cb(new Error("Por favor, envie apenas png ou jpg!"));

    }
    cb(undefined, true);
  },
});

module.exports = { imageUpload } ;