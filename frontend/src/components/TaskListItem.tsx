import React, { FC, useState } from 'react';
import '../less/card.less';
import TaskListModal from './TaskListModal';
import ModalEdit from './ModalEdit';
import { TaskListResponse } from '../models/response/TaskListResponse';
import { useTypeSelector } from '../hooks/useTypeSelector';
import { useAction } from '../hooks/useAction';

const TaskListItem: FC<TaskListResponse> = ({ id, title, userId }) => {
	const { selectedTaskList, taskListModal, editModal, isClear, isEdit } = useTypeSelector(
		(store) => store.tool,
	);

	const { toolSelectCard, toolRejectCard } = useAction();

	const [openEdit, setOpenEdit] = useState<boolean>(false);
	const [openListModal, setOpenListModal] = useState<boolean>(false);

	const handleCloseModalEdit = () => {
		setOpenEdit(false);
	};

	const handleCloseListModal = () => {
		setOpenListModal(false);
	};

	const isActive = (): boolean => {
		for (let i of selectedTaskList) {
			if (id === i) {
				return true;
			}
		}
		return false;
	};

	const toolListClick = () => {
		if (isClear) {
			for (let i of selectedTaskList) {
				if (id === i) {
					toolRejectCard(id);
					return;
				}
			}
			toolSelectCard(id);
		} else {
			if (isEdit) {
				setOpenEdit(true);
			} else {
				setOpenListModal(true);
			}
		}
	};

	return (
		<div style={{ width: '30%' }}>
			<div
				className={`cardItem ${isActive() ? 'active' : ''}`}
				id={'Card' + id}
				onClick={() => toolListClick()}>
				{title}
			</div>
			{taskListModal ? (
				<TaskListModal
					idList={id}
					open={openListModal}
					title={title}
					onClose={() => handleCloseListModal()}
				/>
			) : (
				''
			)}
			{editModal ? (
				<ModalEdit cardId={id} open={openEdit} title={title} onClose={() => handleCloseModalEdit()} />
			) : (
				''
			)}
		</div>
	);
};

export default TaskListItem;
