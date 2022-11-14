import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../store/action-creator/';

export const useAction = () => {
	const despatch = useDispatch();
	return bindActionCreators(ActionCreators, despatch);
};
