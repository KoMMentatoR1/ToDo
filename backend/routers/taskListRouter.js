import { Router } from "express";
import taskListController from "../controller/taskListController.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const taskListRouter = new Router()

taskListRouter.post("/add",

taskListController.add)

taskListRouter.post("/get",

taskListController.get)

taskListRouter.put("/update",

taskListController.update)

taskListRouter.post("/delete",

taskListController.delete)

export default taskListRouter;