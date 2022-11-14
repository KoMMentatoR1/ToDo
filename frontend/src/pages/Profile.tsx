import { Alert, Button } from '@mui/material';
import { useState } from 'react';
import MenuList from '../components/MenuList';
import PasswordInput from '../components/PasswordInput';
import PersonMenu from '../components/PersonMenu';
import { useAction } from '../hooks/useAction';
import useInput from '../hooks/useInput';
import { useTypeSelector } from '../hooks/useTypeSelector';
import '../less/lists.less';
import '../less/profile.less';

const Profile = () => {
	const password = useInput('', { empty: false });
	const newPassword = useInput('', { empty: false });

	const [alertOpen, setAlertOpen] = useState<boolean>(false);

	const { switchPassword } = useAction();
	const { user, error } = useTypeSelector((state) => state.user);

	const switchClick = () => {
		switchPassword(user.user.id, password.data, newPassword.data);
		setAlertOpen(true);
	};

	return (
		<div className="lists">
			<div className="listsTitle">Profile</div>
			<div className="profileContainer">
				<div className="profileDash">
					<div className="profileSwitchPasswordTitle">Смена пароля</div>
					<PasswordInput label="Старый пароль *" password={password} />
					<PasswordInput label="Новый пароль *" password={newPassword} />
					<Button
						sx={{ width: '100%', mt: '25px', mb: '25px' }}
						className="switchPasswordBautton"
						variant="contained"
						onClick={() => switchClick()}>
						Поменять пароль
					</Button>
					{alertOpen ? (
						error ? (
							<Alert severity="error">Неверный старый пароль</Alert>
						) : (
							<Alert severity="success">Пароль успешно изменен</Alert>
						)
					) : (
						''
					)}
				</div>
				<MenuList />
				<PersonMenu />
			</div>
		</div>
	);
};

export default Profile;
