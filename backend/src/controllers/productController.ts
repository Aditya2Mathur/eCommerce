import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewProductRequestBody } from "../types/types.js";
import { ProductModel } from "../models/productModel.js";
import ErrorHandler from "../utils/utilityClass.js";
import { rm } from "fs";

export const NewProduct = TryCatch(async (req:Request<{},{}, NewProductRequestBody>, res, next) =>{
    const {name,price,stock,category} = req.body;
    const photo =  req.file || "";

    if(!photo) return  next (new ErrorHandler("Photo is required",400));
    if(!name ||  !price || !stock || !category ){
        rm(photo.path, ()=>{
            console.log(`first file removed ${photo.filename}`);   
        })
        return next (new ErrorHandler("All fields are required",400))
    }

    await ProductModel.create({
        name,
        price,
        stock,
        category: category.toLowerCase(),
        photo: photo.path
    })

    res.status(201).json({
        message:"Created product successfully",
        success: true,
        NewProduct
    })
})