import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
const mongoose = __require("mongoose");
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});
export const ProductModel = mongoose.model("Product", productSchema);
