import { IToollistState, ToolAction, ToolTypes } from "../../types/toolTypes"

const initialStore: IToollistState = {
    isEdit: false,
    isClear: false,
    isProfile: false,
    taskListModal: true,
    editModal: false,
    addModal: false,
    selectedTaskList: []
}

export const toolReducer = (store = initialStore, action: ToolAction): IToollistState => {
    switch(action.type){

        case ToolTypes.TOOL_DEFAULT:
            return {isEdit: false, isClear: false, isProfile: false, taskListModal: true, editModal: false, addModal: false, selectedTaskList: []} 

        case ToolTypes.TOOL_ACTIVE_EDIT:
            return {isEdit: true, isClear: false, isProfile: false, taskListModal: false, editModal: true, addModal: false, selectedTaskList: []} 
            
        case ToolTypes.TOOL_ACTIVE_CLEAR:
            return {isEdit: false, isClear: true, isProfile: false, taskListModal: false, editModal: false, addModal: false, selectedTaskList: []} 

        case ToolTypes.TOOL_ACTIVE_PROFILE:
            return {isEdit: false, isClear: false, isProfile: true, taskListModal: false, editModal: false, addModal: false, selectedTaskList: []} 

        case ToolTypes.TOOL_ADD_MODAL_ACTIVE:
            return {isEdit: false, isClear: false, isProfile: false, taskListModal: false,  editModal: false, addModal: true, selectedTaskList: []}

        case ToolTypes.TOOL_SELECT_CARD:
            return {isEdit: false, isClear: true, isProfile: false, taskListModal: false, editModal: false, addModal: false, selectedTaskList: [...store.selectedTaskList, action.payload]}

        case ToolTypes.TOOL_REJECT_CARD:
            return {isEdit: false, isClear: true, isProfile: false, taskListModal: false, editModal: false, addModal: false, selectedTaskList: [...store.selectedTaskList.filter((el) => el !== action.payload )]}

        default: 
            return store;
    }
}