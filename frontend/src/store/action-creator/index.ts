import * as AuthActionCreators from './auth'
import * as TaskListActionCreator from "./taskList"
import * as ToolListActionCreator from "./tools"

export default {
    ...AuthActionCreators,
    ...TaskListActionCreator,
    ...ToolListActionCreator
}