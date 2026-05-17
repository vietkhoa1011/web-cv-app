// src/app.js
import express from "express";
import cors from "cors";
import categoryRoute from "./routes/category.js";
import productRoute from "./routes/product.js";
import authRoute from "./routes/auth.js";
const app = express();
// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API is running..."));
app.use("/api/products", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/auth", authRoute);

export default app;
