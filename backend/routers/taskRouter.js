import { Router } from "express";
import taskController from "../controller/taskController.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const taskRouter = new Router()

taskRouter.post("/add",
authMiddleware,
taskController.add)

taskRouter.post("/get",
authMiddleware,
taskController.get)

taskRouter.put("/update",
authMiddleware,
taskController.update)

taskRouter.post("/delete",
authMiddleware,
taskController.delete)

export default taskRouter;