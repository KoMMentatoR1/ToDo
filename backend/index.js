import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import "dotenv/config"
import { db_connect } from "./db_connect.js";
import userRouter from "./routers/userRouter.js";
import { errorMiddleware } from "./middlewares/error-middleware.js";
import taskListRouter from "./routers/taskListRouter.js";


const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use("/user", userRouter)
app.use("/lists", taskListRouter)
app.use(errorMiddleware)

const start = async () => {
    try{
        await db_connect()
        app.listen(PORT, () => console.log("Server started on PORT = " + PORT))
    } catch(e){
        console.log(e);
    }
}

start()