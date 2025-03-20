const mongoose = require("mongoose");


const connectToDataBase = async () => {
  try {
    const dbUrl = process.env.MONGO_URL; 
    await mongoose.connect(dbUrl);
    console.log("Conexión a MongoDB exitosa");
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error);
  }
};

module.exports = connectToDataBase;
