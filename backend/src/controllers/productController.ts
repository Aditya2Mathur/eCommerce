import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewProductRequestBody } from "../types/types.js";
import { ProductModel } from "../models/productModel.js";
import ErrorHandler from "../utils/utilityClass.js";
import { rm } from "fs";

export const NewProduct = TryCatch(async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file || "";

    if (!photo) return next(new ErrorHandler("Photo is required", 400));
    if (!name || !price || !stock || !category) {
        rm(photo.path, () => {
            console.log(`Product Deleted  ${photo.filename}`);
        })
        return next(new ErrorHandler("All fields are required", 400))
    }

    const product = await ProductModel.create({
        name,
        price,
        stock,
        category: category.toLowerCase(),
        photo: photo.path
    })

    res.status(201).json({
        message: "Created product successfully",
        success: true,
        product
    })
})

export const getLatestProduct = TryCatch(async (req, res, next) => {
    const latestProducts = await ProductModel.find({}).sort({ createdAt: - 1 }).limit(4);

    res.status(200).json({
        message: "Got Latest products",
        success: true,
        latestProducts
    })
})
export const getCategpries = TryCatch(async (req, res, next) => {
    const categories = await ProductModel.distinct("category");

    res.status(200).json({
        message: "Got Categories",
        success: true,
        categories
    })
})
export const adminProducts = TryCatch(async (req, res, next) => {
    const categories = await ProductModel.find();

    res.status(200).json({
        message: "Got all products",
        success: true,
        categories
    })
})
export const singleProduct = TryCatch(async (req, res, next) => {
    const product = await ProductModel.findById(req.params.id)

    res.status(200).json({
        message: "Get product",
        success: true,
        product
    })
})

export const updateProduct = TryCatch(async (req: Request<{ id: string }, {}, NewProductRequestBody>, res, next) => {
    const { id } = req.params;
    const { name, price, stock, category } = req.body;
    const photo = req.file || "";

    // Optional: Check if the product exists
    const productExists = await ProductModel.findById(id);
    if (!productExists) return next(new ErrorHandler("Product not found", 404));

    // Optional: Handle photo update logic here, if necessary

    const updatedProduct = await ProductModel.findByIdAndUpdate(id, {
        name,
        price,
        stock,
        category: category.toLowerCase(),
        ...(photo && { photo: photo.path }) // Conditionally add photo if it exists
    }, { new: true }); // Return the updated document

    if (!updatedProduct) return next(new ErrorHandler("Failed to update product", 400));

    res.status(200).json({
        message: "Product updated successfully",
        success: true,
        product: updatedProduct
    });
});

export const deleteProduct = TryCatch(async (req: Request<{ id: string }>, res, next) => {
    const { id } = req.params;

    const product = await ProductModel.findById(id);

    if (!product) return next(new ErrorHandler("Product not found", 404));

    // Delete the product photo from the filesystem
    rm(product.photo, { force: true }, (err) => {
        if (err) {
            console.error(`Failed to delete photo ${product.photo}`, err);
            return next(new ErrorHandler("Failed to delete product photo", 500));
        }
        console.log(`Product photo deleted ${product.photo}`);
    });

    // Delete the product from the database
    await ProductModel.findByIdAndDelete(id);

    res.status(200).json({
        message: "Product deleted successfully",
        success: true
    });
});