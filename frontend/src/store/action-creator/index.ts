import * as AuthActionCreators from './auth'
import * as TaskListActionCreator from "./taskList"
import * as ToolListActionCreator from "./tools"
import * as TaskActionCreator from "./task"

export default {
    ...AuthActionCreators,
    ...TaskListActionCreator,
    ...ToolListActionCreator,
    ...TaskActionCreator
}