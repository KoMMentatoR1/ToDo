import { FC, useEffect } from 'react';
import { useAction } from '../hooks/useAction';
import { useTypeSelector } from '../hooks/useTypeSelector';
import '../less/card.less';
import LoaderWithBackground from './LoaderWithBackground';
import TaskListItem from './TaskListItem';

const TaskLists: FC = () => {
	const { taskLists } = useTypeSelector((store) => store.taskList);
	const { user } = useTypeSelector((store) => store.user);
	const { isLoading } = useTypeSelector((store) => store.taskList);
	const { getTaskList } = useAction();

	useEffect(() => {
		getTaskList(user.user.id);
	}, []);

	if (isLoading) {
		return <LoaderWithBackground />;
	} else {
		return (
			<div className="card">
				{taskLists.map((card, index) => (
					<TaskListItem id={card.id} title={card.title} userId={card.userId} key={index} />
				))}
			</div>
		);
	}
};

export default TaskLists;
