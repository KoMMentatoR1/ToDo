import { ITaskListState, TaskListAction, TaskListTypes } from '../../types/taskListTypes';

const defaultStore: ITaskListState = {
	isLoading: false,
	error: null,
	taskLists: [],
};

export const taskListReducer = (state = defaultStore, action: TaskListAction): ITaskListState => {
	switch (action.type) {
		case TaskListTypes.FETCH_TASKLIST:
			return { isLoading: true, error: null, taskLists: [...state.taskLists] };
		case TaskListTypes.FETCH_TASKLIST_ADD:
			return { isLoading: false, error: null, taskLists: [...state.taskLists, action.payload] };
		case TaskListTypes.FETCH_TASKLIST_GET:
			return { isLoading: false, error: null, taskLists: [...action.payload] };
		case TaskListTypes.FETCH_TASKLIST_UPDATE:
			return {
				isLoading: false,
				error: null,
				taskLists: [...state.taskLists.map((el) => (el.id === action.payload.id ? action.payload : el))],
			};
		case TaskListTypes.FETCH_TASKLIST_DELETE:
			return {
				isLoading: false,
				error: null,
				taskLists: [
					...state.taskLists.filter((el) => (action.payload.indexOf(el.id) === -1 ? true : false)),
				],
			};
		case TaskListTypes.FETCH_TASKLIST_ERROR:
			return { isLoading: false, error: action.payload, taskLists: [] };
		default:
			return state;
	}
};
