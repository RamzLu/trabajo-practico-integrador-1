import express from "express";
import "dotenv/config";
import { startDB } from "./src/config/batabase.js";
import { userRoute } from "./src/routes/user.route.js";
import { profileRoute } from "./src/routes/profile.route.js";
import { tagRoute } from "./src/routes/tag.route.js";
import { articleRoute } from "./src/routes/article.route.js";
import { articleTagRoute } from "./src/routes/articleTag.route.js";
import { authRouter } from "./src/routes/auth.route.js";
// ----------------------------------------------------------------------------------------------------------
import { User } from "./src/models/user.model.js";
import { Tag } from "./src/models/tag.model.js";
import { Profile } from "./src/models/profile.model.js";
import { ArticleTag } from "./src/models/articleTag.model.js";
import { Article } from "./src/models/article.model.js";
// ----------------------------------------------------------------------------------------------------------

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use("/api", userRoute);
app.use("/api", profileRoute);
app.use("/api", tagRoute);
app.use("/api", articleRoute);
app.use("/api", articleTagRoute);
app.use("/api", authRouter);

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
