import { TryCatch } from "../middlewares/error.js";
import { ProductModel } from "../models/productModel.js";
import ErrorHandler from "../utils/utilityClass.js";
import { rm } from "fs";
import { nodeCache } from "../app.js";
import { invalidCache } from "../utils/features.js";
export const getLatestProduct = TryCatch(async (req, res, next) => {
    let Products;
    if (nodeCache.has("latest-products"))
        Products = JSON.parse(nodeCache.get("latest-products"));
    else {
        Products = await ProductModel.find({}).sort({ createdAt: -1 }).limit(4);
        nodeCache.set("latest-product", JSON.stringify(Products));
    }
    res.status(200).json({
        message: "Got Latest products",
        success: true,
        Products
    });
});
export const getCategpries = TryCatch(async (req, res, next) => {
    let categories;
    if (nodeCache.has("category"))
        categories = JSON.parse(nodeCache.get("category"));
    else {
        categories = await ProductModel.distinct("category");
        nodeCache.set("category", JSON.stringify(categories));
    }
    res.status(200).json({
        message: "Got Categories",
        success: true,
        categories
    });
});
export const adminProducts = TryCatch(async (req, res, next) => {
    let products;
    if (nodeCache.has("all-products"))
        products = JSON.parse(nodeCache.get("all-products"));
    else {
        const products = await ProductModel.find();
        nodeCache.set("all-products", JSON.stringify(products));
    }
    res.status(200).json({
        message: "Got all products",
        success: true,
        products
    });
});
export const singleProduct = TryCatch(async (req, res, next) => {
    let product;
    const productId = req.params.id;
    if (nodeCache.has(`product-${productId}`)) {
        product = JSON.parse(nodeCache.get(`product-${productId}`));
    }
    else {
        product = await ProductModel.findById(productId);
        if (!product)
            return next(new ErrorHandler("Product not found", 404));
        nodeCache.set(`product-${productId}`, JSON.stringify(product));
    }
    res.status(200).json({
        message: "Get product",
        success: true,
        product
    });
});
export const NewProduct = TryCatch(async (req, res, next) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file || "";
    if (!photo)
        return next(new ErrorHandler("Photo is required", 400));
    if (!name || !price || !stock || !category) {
        rm(photo.path, () => {
            console.log(`Product Deleted  ${photo.filename}`);
        });
        return next(new ErrorHandler("All fields are required", 400));
    }
    const product = await ProductModel.create({
        name,
        price,
        stock,
        category: category.toLowerCase(),
        photo: photo.path
    });
    await invalidCache({ product: true });
    res.status(201).json({
        message: "Created product successfully",
        success: true,
        product
    });
});
export const updateProduct = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const { name, price, stock, category } = req.body;
    const photo = req.file || "";
    // Optional: Check if the product exists
    const productExists = await ProductModel.findById(id);
    if (!productExists)
        return next(new ErrorHandler("Product not found", 404));
    // Optional: Handle photo update logic here, if necessary
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, {
        name,
        price,
        stock,
        category: category.toLowerCase(),
        ...(photo && { photo: photo.path }) // Conditionally add photo if it exists
    }, { new: true }); // Return the updated document
    if (!updatedProduct)
        return next(new ErrorHandler("Failed to update product", 400));
    await invalidCache({ product: true });
    res.status(200).json({
        message: "Product updated successfully",
        success: true,
        product: updatedProduct
    });
});
export const deleteProduct = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    if (!product)
        return next(new ErrorHandler("Product not found", 404));
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
    await invalidCache({ product: true });
    res.status(200).json({
        message: "Product deleted successfully",
        success: true
    });
});
export const searchQuery = TryCatch(async (req, res, next) => {
    const { search, price, sort, category } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCTS_PER_PAGE) || 10;
    const skip = (page - 1) * limit;
    const baseQuery = {};
    if (search)
        baseQuery.name = {
            $regex: search,
            $options: "i"
        };
    if (price)
        baseQuery.price = { $lte: Number(price) };
    if (category)
        baseQuery.category = category;
    const [products, filteredProducts] = await Promise.all([
        ProductModel.find(baseQuery).sort(sort && { price: sort === "asc" ? 1 : -1 }).limit(limit).skip(skip),
        await ProductModel.find(baseQuery)
    ]);
    const totalPage = Math.ceil(filteredProducts.length / limit);
    res.status(200).json({
        products,
        totalPage,
        success: true
    });
});
