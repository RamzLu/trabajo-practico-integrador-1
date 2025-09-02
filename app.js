import express from "express";
import dotenv from "dotenv";
import { startDB } from "./src/config/batabase.js";
// ----------------------------------------------------------------------------------------------------------
import { User } from "./src/models/user.model.js";
import { Tag } from "./src/models/tag.model.js";
import { Profile } from "./src/models/profile.model.js";
import { ArticleTag } from "./src/models/articleTag.model.js";
import { Article } from "./src/models/article.model.js";

// ----------------------------------------------------------------------------------------------------------
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
