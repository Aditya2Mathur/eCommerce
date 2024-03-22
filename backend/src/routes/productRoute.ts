import Express  from "express";
import bodyParser from "body-parser";
import { NewProduct, adminProducts, deleteProduct, getCategpries, getLatestProduct, searchQuery, singleProduct, updateProduct } from "../controllers/productController.js";
import { singleUpload } from "../middlewares/multer.js";
import { adminOnly } from "../middlewares/auth.js";
const app = Express.Router();
app.use(bodyParser.json())

// To use url for front_end - /api/v1/product/....

app.post("/newproduct",adminOnly, singleUpload,NewProduct)
app.get("/latest", getLatestProduct)
app.get("/categories", getCategpries)
app.get("/admin-products", adminOnly, adminProducts)
app.get("/admin-product", adminOnly, singleProduct)

app.get('/search', searchQuery)

app.route("/:id").get(singleProduct).put(singleUpload ,updateProduct).delete( adminOnly,deleteProduct)

export default app;