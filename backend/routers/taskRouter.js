import { Router } from "express";
import taskController from "../controller/taskController.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const taskRouter = new Router()

taskRouter.post("/add",

taskController.add)

taskRouter.post("/get",

taskController.get)

taskRouter.put("/update",

taskController.update)

taskRouter.post("/delete",

taskController.delete)

export default taskRouter;