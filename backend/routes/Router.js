//---Configurações de Rotas---;
const express = require("express");
const router = express();

// Importando Rotas de API para POSTMAN
router.use("/api/users", require("./UserRoutes"));
router.use("/api/photos", require("./PhotoRouters"));

// Teste de Rotas
// router.get("/", (req, res) => {
//   res.send("API Working!");
// });


module.exports = router;