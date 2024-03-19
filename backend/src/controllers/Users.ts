import { NextFunction, Request, Response, } from "express"
import { UserModel } from "../models/Users.js";
import { NewUserRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utilityClass.js";
import { TryCatch } from "../middlewares/error.js";
export const newUser = TryCatch(async (req: Request<{}, {}, NewUserRequestBody>, res: Response, next: NextFunction) => {
    const {
        _id,
        name,
        email,
        password,
        photo,
        gender,
        dob } = req.body;

    let user = await UserModel.findById(_id)
    if (user)
        return res.status(200).json({
            success: true,
            message: `Welcome,${user.name}`,
        })

    if (!_id || !name || !email || !password || !photo || !gender || !dob)
        return next(new ErrorHandler("All fields are required", 400))


    user = await UserModel.create({
        _id,
        name,
        email,
        password,
        photo,
        gender,
        dob: new Date(dob)
    })
    res.status(200).json({
        seccuss: true,
        message: `user Created Seccussfully ${user.name}`
    })
}
);

export const getAllUsers = TryCatch(async (req, res, next) => {
    try {
        const savedUsers = await UserModel.find({}); // Wait for the asynchronous operation to complete
        return res.json({
            success: true,
            savedUsers
        });
    } catch (error) {
        return next(error); // Forward the error to the next middleware
    }
});

export const findOneUser = TryCatch(async (req, res, next) => {
    try {
        const userid = req.params.userid; // Assuming userId is passed in the request params
        const user = await UserModel.findOne({ _id: userid }); // Find user by userId
        if (!user) {
            return res.status(404).json({ 
                success: true,
                message: 'User not found' });
        }
        return res.json(user);
    } catch (error) {
        return next(error); // Forward the error to the next middleware
    }
});

export const deleteUser = TryCatch(async (req, res, next) => {
    try {
        const { userid } = req.params; // Assuming userId is passed in the request params
        const deletedUser = await UserModel.findByIdAndDelete(userid); // Find user by userId and delete
        if (!deletedUser) {
            return res.status(404).json({
                success: true,
                message: 'User not found' });
        }
        return res.json({
            success: true,
            message: 'User deleted successfully' 
            });
    } catch (error) {
        return next(error); // Forward the error to the next middleware
    }
});