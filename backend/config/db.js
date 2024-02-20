// === Configuração do Banco de Dados ===
// Configuração da conexão do DB;

const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@rdb.xbrmdpg.mongodb.net/?retryWrites=true&w=majority`);
    
    console.log("Banco De Dados Conectado!!!");

    return dbConn;
  } catch (error) {
    console.log(error);

  }

};
conn();

module.export = conn;


