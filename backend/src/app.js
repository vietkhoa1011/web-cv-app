// src/app.js
import express from "express";
import cors from "cors";
import categoryRoute from "./routes/category.js";
import productRoute from "./routes/product.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API is running..."));
app.use("/api/products", productRoute);
app.use("/api/category", categoryRoute);

export default app;
