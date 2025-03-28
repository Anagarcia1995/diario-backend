const express = require("express");
const escritosRouter = require("./routes/escritosRouter");
const userRouter = require("./routes/userRouter");
const loginRouter = require("./routes/loginRouter");
const cors = require("cors");
const connectToDataBase = require("./db/db");
const path = require("path"); 

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

connectToDataBase();

app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 

app.use("/api", escritosRouter);
app.use("/api", userRouter);
app.use("/api", loginRouter);

app.listen(3000, () => {
  console.log("Server is running http://localhost:3000");
});
