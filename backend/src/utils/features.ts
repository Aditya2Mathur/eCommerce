import mongoose from "mongoose";
import { InvalidCacheType } from "../types/types.js";
import { nodeCache } from "../app.js";
import { ProductModel } from "../models/productModel.js";
export const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017", {
        dbName: "eCommerceBackend"
    }).then((c) => console.log(`DB connected to ${c.connection.host}`))
    .catch((e) => console.error(e));
}

export const invalidCache = async ({product, order, admin}: InvalidCacheType) =>{
    if (product) {
        // Predefined keys for product-related caches
        const productKeys: string[] = ["latest-products", "category", "all-products"];
    
        // Retrieve all product IDs and transform them into cache keys
        const productIds = await ProductModel.find({}).select("_id");
        const productIdKeys = productIds.map(({ _id }) => `product-${_id}`);
        
        // Combine the predefined keys with the product-specific keys
        const allProductKeys = [...productKeys, ...productIdKeys];
    
        // Delete all related product caches
        nodeCache.del(allProductKeys);
    }


if(order){

}
if(admin){

}

}