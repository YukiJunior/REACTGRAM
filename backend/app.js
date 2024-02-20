// configuração do dotenv:
require("dotenv").config();

// configurações de requisições 
const express = require("express");
const path = require("path");
const cors = require("cors");

// configurção porta do server
const port = process.env.PORT;  

const app = express();

// configuração para JSON e form data response(imagem)
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// CORS
app.use(cors({credentials: true, origin: "http://localhost:3000"}));

// Upload diretorio (imagens);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// conexão do DB;
// conexão do DB;
require("./config/db.js").default;

// Invocando Rotas
const router = require("./routes/Router.js");

app.use(router);


// invocação do server.
app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});

