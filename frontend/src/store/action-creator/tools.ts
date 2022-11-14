import { Dispatch } from 'redux';
import { ToolAction, ToolTypes } from '../../types/toolTypes';

export const setDefaultTool = () => {
	return (dispatch: Dispatch<ToolAction>) => {
		dispatch({ type: ToolTypes.TOOL_DEFAULT });
	};
};

export const toolActiveEdit = () => {
	return (dispatch: Dispatch<ToolAction>) => {
		dispatch({ type: ToolTypes.TOOL_ACTIVE_EDIT });
	};
};

export const toolActiveClear = () => {
	return (dispatch: Dispatch<ToolAction>) => {
		dispatch({ type: ToolTypes.TOOL_ACTIVE_CLEAR });
	};
};

export const toolActiveProfile = () => {
	return (dispatch: Dispatch<ToolAction>) => {
		dispatch({ type: ToolTypes.TOOL_ACTIVE_PROFILE });
	};
};

export const toolAddModalActive = () => {
	return (dispatch: Dispatch<ToolAction>) => {
		dispatch({ type: ToolTypes.TOOL_ADD_MODAL_ACTIVE });
	};
};

export const toolSelectCard = (taskListNumber: number) => {
	return (dispatch: Dispatch<ToolAction>) => {
		dispatch({ type: ToolTypes.TOOL_SELECT_CARD, payload: taskListNumber });
	};
};

export const toolRejectCard = (taskListNumber: number) => {
	return (dispatch: Dispatch<ToolAction>) => {
		dispatch({ type: ToolTypes.TOOL_REJECT_CARD, payload: taskListNumber });
	};
};
