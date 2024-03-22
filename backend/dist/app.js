import Express from "express";
import { connectDB } from "./utils/features.js";
import { errorHandlerMaddlerware } from "./middlewares/error.js";
import NodeCache from "node-cache";
import Users from "./routes/Users.js";
import NewProduct from "./routes/productRoute.js";
const port = 3001;
connectDB();
const app = Express();
app.use(Express.json());
export const nodeCache = new NodeCache();
app.get("/", function (req, res) {
    res.send("Hello World");
});
app.use("/api/v1/user", Users);
app.use("/api/v1/product", NewProduct);
app.use("/uploads", Express.static('uploads'));
app.use(errorHandlerMaddlerware);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
