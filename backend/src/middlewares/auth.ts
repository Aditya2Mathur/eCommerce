import { UserModel } from "../models/Users.js";
import ErrorHandler from "../utils/utilityClass.js";
import { TryCatch } from "./error.js";

export const adminOnly = TryCatch(async (req, res, next) =>{
    const {id} = req.query;

    if(!id) return next( new ErrorHandler("Admin id is required", 401));

    const user = await UserModel.findById(id);
    if(!user) return next (new ErrorHandler("User not found", 404));
    if(user.role !== 'admin')
        return next(new ErrorHandler("Admin can access", 401)); 

    next();
})