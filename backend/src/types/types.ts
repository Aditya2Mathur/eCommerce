import { NextFunction, Request, Response } from "express";

export interface NewUserRequestBody {
    _id: string,
    name: string,
    email: string,
    password: string,
    photo: string,
    gender: string,
    dob: Date,
}
export interface NewProductRequestBody {
    name: string;
    price: number;
    photo: string;
    stock: number;
    category: string;
}

export type ControllerType = (req: Request<any>, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>

