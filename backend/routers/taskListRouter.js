import { Router } from "express";
import taskListController from "../controller/taskListController.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const taskListRouter = new Router()

taskListRouter.post("/add",
authMiddleware,
taskListController.add)

taskListRouter.post("/get",
authMiddleware,
taskListController.get)

taskListRouter.put("/update",
authMiddleware,
taskListController.update)

taskListRouter.post("/delete",
authMiddleware,
taskListController.delete)

export default taskListRouter;