import express from "express";
import dotenv from "dotenv";
import { startDB } from "./src/config/batabase.js";
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
