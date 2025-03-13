const express = require("express"); // Añadimos express para crear la app
const escritosRouter = require("./routes/escritosRouter");
const userRouter = require("./routes/userRouter");
const loginRouter = require("./routes/loginRouter");

const bcrypt = require('bcrypt');
const cors = require("cors")
const connectToDataBase = require("./db/db");
require("dotenv").config(); // Cargamos las variables de entorno desde .env

const app = express(); // Inicializamos la app de express

app.use(express.json()); // Middleware para manejar datos JSON

app.use(cors())
// Conectar a la base de datos de MongoDB
connectToDataBase();

// Usamos el router para manejar las rutas de la API
app.use("/api", escritosRouter);
app.use("/api", userRouter)
app.use("/api", loginRouter)


app.listen(3000, () => {
  console.log("Server is running http://localhost:3000"); // Levantamos el puerto y mostramos el mensaje
});
