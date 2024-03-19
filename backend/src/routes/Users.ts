import Express  from "express";
import { deleteUser, findOneUser, getAllUsers, newUser } from "../controllers/Users.js";
import bodyParser from "body-parser";
import { adminOnly } from "../middlewares/auth.js";
const app = Express()
app.use(bodyParser.json())
app.post("/new", newUser)

app.get('/all', adminOnly, getAllUsers);

app.route("/:userid").get(findOneUser).delete(deleteUser)


export default app;