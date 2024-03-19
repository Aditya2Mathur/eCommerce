import Express from "express";
import bodyParser from "body-parser";
import { NewProduct } from "../controllers/productController.js";
import { singleUpload } from "../middlewares/multer.js";
const app = Express.Router();
app.use(bodyParser.json());
app.post("/newproduct", singleUpload, NewProduct);
export default app;
