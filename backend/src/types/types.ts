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

export type searchQueryProducts = {
    search?: string;
    price?: string;
    category?: string;
    sort?: string;
    page?: string;
}

export interface BaseQuery{
    name?:{
        $regex :string,
        $options: string
    };
    price?:{
        $lte:number
    };
    category?:string;
}

export type InvalidCacheType = {
    product? : boolean;
    order?   : boolean;
    admin?   : boolean;
}