import style from './Chat.module.scss';
import { ChatContent } from './ChatContent/ChatContent';
import { ChatForm } from './ChatForm/ChatForm';
import { useSelector } from 'react-redux';
import  { RootState } from '../../types/root_state'


export function Chat() {
    const background = useSelector((state: RootState) => state.background.url);
    const chatStyle = {
			background: `url(${background})`,
	};	

    return (
        <section style={chatStyle} className={style.chat}>
            <ChatContent/>
            <ChatForm/>
        </section>
    );
}
