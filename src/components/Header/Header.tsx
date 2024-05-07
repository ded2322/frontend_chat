import { useState, useEffect, useRef } from 'react';
import { Settings } from 'lucide-react';
import { CircleX } from 'lucide-react';
import style from './Header.module.scss';
import { SettingHeaderModal } from './settingHeaderModal/SettingHeaderModal';
import { ProfileHeaderModal } from './ProfileHeaderModal/ProfileHeaderModal';
import { getUserInfo } from '../../api/get_user_info';
import { useSessionStorage } from '../../hooks/use_session_storage';
import { backendURL } from '../../api/api_config';

export function Header() {

	const [isOpenSettings, setStatusSetting] = useState(false);
	const [isOpenProfile, setisOpenProfile] = useState(false);
	const [imgAvatarUrl, setImgAvatarUrl] = useState('');
	const { value } = useSessionStorage('access_token');
	const refHead = useRef<HTMLDivElement | null>(null);
	const refModal = useRef<HTMLDivElement | null>(null);

	const openSettings = (e:any) => {
		setStatusSetting(!isOpenSettings);
		setisOpenProfile(false);
		e.stopPropagation();
	};

	const openProfile = (e:any) => {
		setisOpenProfile(!isOpenProfile);
		setStatusSetting(false);
		e.stopPropagation();
	};


	useEffect(() => {
		if (value) {
			getUserInfo(value)
				.then(data => {
					setImgAvatarUrl(`${backendURL}${data.user_avatar}`);
				})
				.catch(error => {
					console.error('Произошла ошибка:', error);
				});
		}
	}, [value]);

	const handleClickOutside = (e: any) => {
		if (refModal.current && !refModal.current.contains(e.target)) {
			setisOpenProfile(false);
			setStatusSetting(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<>
			<header className={style.header} ref={refHead}>
				<button className={style.settings_btn} onClick={openSettings}>
					{!isOpenSettings && <Settings className={style.settings} />}
					{isOpenSettings && <CircleX className={style.close} />}
				</button>
				<a href='#' role="button" className={style.user} onClick={openProfile}>
					{!isOpenProfile && <img src={imgAvatarUrl} alt="avatar" />}
					{isOpenProfile && <CircleX className={style.close} />}
				</a>
			</header>
			<div ref={refModal}>
				<SettingHeaderModal isOpenSettings={isOpenSettings} />
				<ProfileHeaderModal isOpenProfile={isOpenProfile} />
			</div>
		</>
	);
}
