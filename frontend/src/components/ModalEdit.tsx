import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { FC, useState } from 'react';
import { useAction } from '../hooks/useAction';
import { useTypeSelector } from '../hooks/useTypeSelector';
import '../less/modalEdit.less';

interface IModal {
	open: boolean;
	onClose: () => void;
	title: string;
	cardId: number;
}

const ModalEdit: FC<IModal> = ({ open, onClose, title, cardId }: IModal) => {
	const [value, setValue] = useState<string>('');

	const { id } = useTypeSelector((state) => state.user.user.user);
	const { updateTaskList, setDefaultTool } = useAction();

	const clickSuccess = () => {
		updateTaskList(cardId, id, value);
		setDefaultTool();
	};

	return (
		<div>
			<Modal open={open}>
				<Box className="modalEdit">
					<div className="modalEditTitle">{title}</div>
					<form className="modalEditForm">
						<TextField
							sx={{ width: '100%' }}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
							id="outlined-basic"
							label="Введите новое название"
							variant="outlined"
							value={value}
						/>
					</form>
					<div className="EditButtonContainer">
						<Button
							sx={{ width: '49%' }}
							variant="contained"
							color="success"
							onClick={() => clickSuccess()}>
							Изменить
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

export default ModalEdit;
