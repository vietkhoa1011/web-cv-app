import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import Product from "./models/Product.js";
import categoryRoute from "./routes/category.js";
import productRoute from "./routes/product.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// products route
app.use("/api/products", productRoute);
// category route
app.use("/api/category", categoryRoute);

// connect MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected MongoDB"))
    .catch(err => console.log(err));

// run server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});