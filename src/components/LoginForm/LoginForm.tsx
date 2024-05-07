import { authUser, registerUser } from '../../api/up_in_User';
import { useSessionStorage } from '../../hooks/use_session_storage';
import { validateUsername } from '../../validations/login';
import { validatePassword } from '../../validations/password';
import style from './LoginForm.module.scss';
import { useEffect, useState } from 'react';
import { hiText } from './hi_text';
import useLocalStorage from '../../hooks/use_local_storage';


export const LoginForm = () => {
	const [userId] = useLocalStorage('user_id', '');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const { updateSessionStorage } = useSessionStorage('access_token');
	const [statusForm, setStatusForm] = useState(false);
	const [statusPassInput, setStatusPassInput] = useState('password');
	const [requestCount, setRequestCount] = useState(0);
	const [isRequesting, setRequesting] = useState(false);
	const checkStatusForm = (status: boolean) => {
		setStatusForm(status);
	};

		const handleRequest = async () => {
		if (requestCount >= 5) {
			alert('Можно отправлять запрос раз в 5 секунд');
			setRequesting(true);
			setTimeout(() => {
				setRequesting(false);
			}, 5000);
			return;
		}
		// Ваша логика отправки запроса
		setRequestCount(requestCount + 1);
	};

	
	const loginAuthForm = async (name: string, password: string) => {
		if (name.trim() === '' || password.trim() === '') return;
		try {
			if (statusForm) {
				if (!validatePassword(password)) return alert('Пароль должен состоять минимум из 7 символов. 1 цифры, 1 буквы верхнего регистра и 1 спецсимвола.');
				if (!validateUsername(name)) return alert('Имя должно быть 3-10 символов! Спецсимволы использовать нельзя');
				await registerUser(name, password);

				const response = await authUser(name, password);
				updateSessionStorage(response);

			} else if (!statusForm) {
				const response = await authUser(name, password);
				if (response !== null && typeof (response) === 'string') {
					updateSessionStorage(response);
				}
			}
		} catch (error) {
			console.error('Ошибка:', error);
		}
	}

	const inputToggle = () => {
		if (statusPassInput === "password") setStatusPassInput('text')
		if (statusPassInput === "text") setStatusPassInput('password')
	}

	const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
			loginAuthForm(name, password); 
			handleRequest();
    }
  };
	useEffect(() => {
		document.addEventListener("keydown", handleKeyPress);
		return () => document.removeEventListener("keydown", handleKeyPress);
	}, []);

	useEffect(() => {
		setTimeout( () => {
			if(!userId) {
				alert(hiText)
			}
		}, 1000)
		
	}, []);

	return (
		<div id={style.wrapper}>
			{!statusForm && <h1>Авторизация</h1>}
			{statusForm && <h1>Регистрация</h1>}

			<form id={style.signin}>
				<input type="text" id={style.user} onChange={(e) => setName(e.target.value)} name="user" placeholder="username" value={name} />
				<div className='input_group'>
					<input type={statusPassInput} id={style.pass} onChange={(e) => setPassword(e.target.value)} name="pass" placeholder="password" value={password} />
				</div>
				<button type="button" disabled={isRequesting} onKeyUp={handleKeyPress} onClick={() => { loginAuthForm(name, password); /*handleRequest();*/ }}>&#xf0da;</button>
			</form>

			<div>
				<button onClick={() => checkStatusForm(false)} id={style.in_btn}>Войти</button>
				<button onClick={() => checkStatusForm(true)} id={style.up_btn}>Зарегистрироваться</button>
				<button onClick={inputToggle} id={style.up_btn}>{statusPassInput === 'password' ? 'Показать пароль' : 'Скрыть пароль'}</button>
			</div>

			<p>Пожалуйста используйте надёжный пароль: не менее 7 символов, 1 спец символ, 1 заглавная буква, 1 цифра.</p>
		</div>
	);
};
