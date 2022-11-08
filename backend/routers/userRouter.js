import { Router } from "express";
import userController from "../controller/userController.js";
import { body } from "express-validator"
import { authMiddleware } from "../middlewares/auth-middleware.js";
const userRouter = new Router()

userRouter.post("/registration",
    body("email").isEmail(),
    body("password").isLength({min: 8}),
    userController.registration
);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
userRouter.get("/activate/:link", userController.activate);
userRouter.get("/refresh", userController.refresh);
userRouter.post("/switchPassword",
authMiddleware,
userController.switchPassword);
userRouter.post("/forgotPassword",
userController.forgotPassword);
userRouter.post("/newPass",
userController.newPass);

export default userRouter;