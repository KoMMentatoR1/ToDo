import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { taskListReducer } from "./taskListReducer";
import { taskReducer } from "./taskReducer";
import { toolReducer } from "./toolReduces";

export const rootReducer = combineReducers({
    auth: authReducer,
    taskList: taskListReducer,
    tool: toolReducer,
    task: taskReducer
})

export type RootState = ReturnType<typeof rootReducer>