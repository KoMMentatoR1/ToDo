import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { FC, useState } from 'react';
import { useAction } from '../hooks/useAction';
import { useTypeSelector } from '../hooks/useTypeSelector';
import '../less/modalEdit.less';

interface IAddModal {
	open: boolean;
	onClose: () => void;
}

const AddModal: FC<IAddModal> = ({ open, onClose }) => {
	const [value, setValue] = useState<string>('');

	const { addTaskList, setDefaultTool } = useAction();
	const { user } = useTypeSelector((store) => store.user);

	const addList = () => {
		addTaskList(value, user.user.id);
		setDefaultTool();
	};

	return (
		<div>
			<Modal open={open}>
				<Box className="modalEdit">
					<div className="modalEditTitle">Добавление нового списка дел</div>
					<form className="modalEditForm">
						<TextField
							sx={{ width: '100%' }}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
							id="outlined-basic"
							label="Введите название списка"
							variant="outlined"
							value={value}
						/>
					</form>
					<div className="EditButtonContainer">
						<Button sx={{ width: '49%' }} variant="contained" color="success" onClick={() => addList()}>
							Добавить
						</Button>
						<Button sx={{ width: '49%' }} variant="contained" color="error" onClick={() => onClose()}>
							Отменить
						</Button>
					</div>
				</Box>
			</Modal>
		</div>
	);
};

export default AddModal;
