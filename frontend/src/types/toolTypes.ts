export interface IToollistState {
    isEdit: boolean;
    isClear: boolean;
    isProfile: boolean;
    taskListModal: boolean;
    editModal: boolean;
    addModal: boolean;
    selectedTaskList: number[];  
}

export enum ToolTypes {
    TOOL_DEFAULT = "TOOL_DEFAULT",
    TOOL_ACTIVE_EDIT = "TOOL_ACTIVE_EDIT",
    TOOL_ACTIVE_CLEAR = "TOOL_ACTIVE_CLEAR",
    TOOL_ACTIVE_PROFILE = "TOOL_ACTIVE_PROFILE",
    TOOL_ADD_MODAL_ACTIVE = "TOOL_ADD_MODAL_ACTIVE",
    TOOL_SELECT_CARD = "TOOL_SELECT_CARD",
    TOOL_REJECT_CARD = "TOOL_REJECT_CARD",
}

interface ToolDefaultAction {
    type: ToolTypes.TOOL_DEFAULT
}

interface ToolActiveEditAction {
    type: ToolTypes.TOOL_ACTIVE_EDIT
}

interface ToolActivepProfileAction {
    type: ToolTypes.TOOL_ACTIVE_PROFILE
}

interface ToolActiveClearAction {
    type: ToolTypes.TOOL_ACTIVE_CLEAR
}

interface ToolAddModalActiveAction {
    type: ToolTypes.TOOL_ADD_MODAL_ACTIVE
}

interface ToolSelectedCardAction {
    type: ToolTypes.TOOL_SELECT_CARD,
    payload: number
}

interface ToolRejectCardAction {
    type: ToolTypes.TOOL_REJECT_CARD,
    payload: number
}

export type ToolAction = ToolDefaultAction | ToolActiveEditAction | ToolActiveClearAction | ToolAddModalActiveAction | ToolSelectedCardAction | ToolRejectCardAction | ToolActivepProfileAction
