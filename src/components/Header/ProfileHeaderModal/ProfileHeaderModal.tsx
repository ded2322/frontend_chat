import { useState, useEffect, useRef } from 'react';
import style from './ProfileHeaderModal.module.scss';
import { useSessionStorage } from '../../../hooks/use_session_storage';
import { getUserInfo } from '../../../api/get_user_info';
import UseLocalStorage from '../../../hooks/use_local_storage';
import { updateAvatarUser } from '../../../api/update_avatar';
import { ImageUp } from 'lucide-react';
import { userDelete } from '../../../api/delete_user';
import { LoginPsswordUpdate } from './LoginPsswordUpdate/LoginPsswordUpdate';
import { backendURL } from '../../../api/api_config';
import { getImageExtension } from '../../../validations/img';

export const ProfileHeaderModal = ({ isOpenProfile }: any) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const { value } = useSessionStorage('access_token');
	const [loginText, setloginText] = useState('');
	const [role, setRole] = useState();
	const [imgAvatarUrl, setImgAvatarUrl] = useState('');
	const [logPassModal, setLogPassModal] = useState(false);

	const [, setUSserId] = UseLocalStorage('user_id', '');
	const [, setAvatar] = UseLocalStorage('user_avatar', '');

	let status = '';
	const avatarUpdate = () => {
		if (fileInputRef.current && fileInputRef.current.files) {
			const file = fileInputRef.current.files[0];
			if(getImageExtension(file.name)) {
				updateAvatarUser(value, file);
				alert('Аватар обновлён, чтобы увидеть обновлённую версию аватара пожалуйста обновите страницу.');
			} else {
				alert('не верный формат файла')
			}
		}
	};

	const exitProfile = () => {
		sessionStorage.removeItem('access_token');
		window.location.reload();
	}

	const userDel = () => {
			const result = confirm("Вы уверены, что хотите удалить аккаунт?");

			if (result) {
				userDelete(value);
				exitProfile();
			}
	}

	useEffect(() => {
		if (value) {
			getUserInfo(value)
				.then(data => {
					setImgAvatarUrl(`${backendURL}${data.user_avatar}`);
					setloginText(data.name);
					setUSserId(data.user_id)
					setRole(data.role)
					setAvatar(imgAvatarUrl)
				})
				.catch(error => {
					console.error('Произошла ошибка:', error);
				});
		}
	}, [value]);

	if (role == 1) {
		status = 'Пользователь';
	} else if (role == 2) {
		status = 'Модератор';
	} else if (role == 3) {
		status = 'Администратор ';
	}

	return (
		<>
			{isOpenProfile && (
				<div className={style.modal}>


					<div className={style.profileWrapper}>

						<div className={style.avatarBlock}>
							<img src={imgAvatarUrl} alt="avatarka" />
							<label htmlFor="real-input" className={style.custom_file_upload}>
								<ImageUp />
								<input
									onChange={avatarUpdate}
									id="real-input"
									type="file"
									ref={fileInputRef}
								/>
							</label>
						</div>
						<div>
							<h3>{loginText}</h3>
							<span>Роль: {status}</span>
						</div>
					</div>
					<button className={style.save} onClick={() => {setLogPassModal(!logPassModal)}}>Обновить логин и пароль</button>
					<button className={style.exit} onClick={exitProfile}>Выход</button>
					<button onClick={userDel} className={style.delete_btn}>Удалить акаунт</button>
				</div>
			)}
			{logPassModal && <LoginPsswordUpdate setLogPassModal={setLogPassModal}/>}
		</>
	);
};
