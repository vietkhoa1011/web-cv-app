import mongoose from "mongoose";
import axios from "axios";
import Product from "../models/Product.js";

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");

const importData = async () => {
    try {
        // lấy data từ fake api
        const res = await axios.get(
            "https://fakestoreapi.com/products"
        );

        // xóa data cũ
        await Product.deleteMany();

        // thêm vào mongodb
        await Product.insertMany(res.data);

        console.log("Import success");

        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

importData();