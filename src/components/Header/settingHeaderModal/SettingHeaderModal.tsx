import style from './SettingHeaderModal.module.scss';
import useLocalStorage from '../../../hooks/use_local_storage';
import { setBackgroundUrl } from '../../../redax/slice/background_slice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Sun } from 'lucide-react';
import { Moon } from 'lucide-react';

export const SettingHeaderModal = ({ isOpenSettings }: any) => {
  const dispatch = useDispatch();

  const [background, setBackground] = useLocalStorage(
    'backgroundValue',
    'https://kalix.club/uploads/posts/2022-12/1671533085_kalix-club-p-oboi-dlya-chata-vkontakte-10.jpg'
  );

  const setBgChat = (url: string) => {
    dispatch(setBackgroundUrl(url));
    setBackground(url);
  };

  useEffect(() => {
    setBgChat(background);
  }, [background]);

  const [localSaveTheme, setLocalSaveTheme] = useLocalStorage('theme', 'light');
  const [theme, setTheme] = useState('light');
  document.body.classList.add(localSaveTheme);

  const changeTheme = (selectedTheme: string) => {
    document.body.classList.remove(theme);
    document.body.classList.add(selectedTheme);
    setTheme(selectedTheme);
		setLocalSaveTheme(selectedTheme);
  };

  return (
    <>
      {isOpenSettings && (
        <div className={style.modal}>
          <h5>Тема</h5>
          <ul className={style.theme}>
            <li>
              <button className={style.l_m} onClick={() => changeTheme('light')}>
								<Sun/>
              </button>
            </li>
            <li>
              <button className={style.d_m} onClick={() => changeTheme('dark')}>
                <Moon/>
              </button>
            </li>
          </ul>
          <h5>Фон</h5>
          <ul className={style.bg}>
            {[
              '../../public/img/chat_background/bg1.jpg',
              '../../public/img/chat_background/bg2.jpg',
              '../../public/img/chat_background/bg3.jpg',
              '../../public/img/chat_background/bg4.jpg',
              '../../public/img/chat_background/bg5.jpg',
              '../../public/img/chat_background/bg6.jpg',
            ].map((bgUrl, index) => (
              <li key={index} style={{backgroundImage: `url(${bgUrl})`}} onClick={() => setBgChat(bgUrl)}>
                &nbsp;
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};


