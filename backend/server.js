import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
dotenv.config();

// connect MongoDB
connectDB();

// run server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});