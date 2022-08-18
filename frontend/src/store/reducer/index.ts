import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { taskListReducer } from "./taskListReducer";
import { toolReducer } from "./toolReduces";

export const rootReducer = combineReducers({
    user: authReducer,
    taskList: taskListReducer,
    tool: toolReducer
})

export type RootState = ReturnType<typeof rootReducer>