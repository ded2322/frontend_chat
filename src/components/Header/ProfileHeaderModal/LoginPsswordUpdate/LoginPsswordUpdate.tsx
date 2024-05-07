import React, { useState } from 'react';
import style from './LoginPsswordUpdate.module.scss';
import { updateDataUser } from '../../../../api/update_data_user';
import { useSessionStorage } from '../../../../hooks/use_session_storage';
import { validatePassword } from '../../../../validations/password';
import { validateUsername } from '../../../../validations/login';

export const LoginPsswordUpdate = ({ setLogPassModal }: any) => {

	const { value } = useSessionStorage('access_token');
	const [loginText, setloginText] = useState('');
	const [passText, setPassText] = useState('');
	const [statusPassInput, setStatusPassInput] = useState('password');

	const changeloginText = (event: React.ChangeEvent<HTMLInputElement>) => {
		setloginText(event.target.value);
	};

	const changePassText = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassText(event.target.value);
	};

	interface UserData {
		name?: string;
		password?: string;
	}

	const dataUpdate = () => {
		let UserData : UserData = {};
		if (loginText.trim() === '' && passText.trim() === '') return;
		if (loginText.trim()) { UserData.name = loginText; if (!validateUsername(loginText)) return alert('Имя должно быть 3-15 символов!');}
		if (passText.trim()) { UserData.password = passText;if (!validatePassword(passText)) return alert('Пароль должен состоять минимум из 7 символов. 1 цифры, 1 буквы верхнего регистра и 1 спецсимвола.');}
		console.log(UserData)
		updateDataUser(UserData, value);
		setLogPassModal(false);
	};

	const inputToggle = () => {
		if (statusPassInput === "password") setStatusPassInput('text')
		if (statusPassInput === "text") setStatusPassInput('password')
	}

	return (
		<div className={style.modal}>
			<div className={style.modal_content}>
				<div className={style.form}>
					<h4>Обновить данные</h4>
					<input onChange={changeloginText} type="text" name="login" id="login" placeholder='login' autoComplete="off" />
					<input onChange={changePassText} type={statusPassInput} name="password" id="pass" placeholder='password' value={passText} />
					<button type='button' onClick={() => dataUpdate()}>Сохранить</button>
					<button onClick={inputToggle} id={style.up_btn}>{statusPassInput === 'password' ? 'Показать пароль' : 'Скрыть пароль'}</button>
					<button type='button' onClick={() => setLogPassModal(false)}>Отмена</button>
				</div>
			</div>
		</div>
	);
};
