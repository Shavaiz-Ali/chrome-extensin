import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/index.js";
import {
  createTranslation,
  getTranslations,
} from "./controller/translation.controller.js";
dotenv.config();

const PORT = process.env.PORT || 6000;
const app = express();
connectDB();

app.use(cors("*"));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extented: true, limit: "16kb" }));

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// routes
app.post("/api/transltions/create-translations", createTranslation);
app.get("/api/transltions/get-translations", getTranslations);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
