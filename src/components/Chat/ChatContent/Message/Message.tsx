import { useRef, useEffect, useState } from 'react';
import style from './Message.module.scss';
import { MessageData } from '../../../../types/props_message_type';
import UseLocalStorage from '../../../../hooks/use_local_storage';
import { UserTools } from './UserTools/UserTools';
import { backendURL } from '../../../../api/api_config';

type MessageProps = {
    message: MessageData;
};

export const Message: React.FC<MessageProps> = ({ message }: MessageProps) => {
    const [isToolOpen, setToolOpen] = useState(false);
    const [userId] = UseLocalStorage('user_id', '');

    const messageRef = useRef<HTMLDivElement>(null);

    const handleToggleTool = () => {
        setToolOpen(true);
    };

    const handleOutsideClick = (e: MouseEvent) => {
        if (messageRef.current && e.target !== messageRef.current && !messageRef.current.contains(e.target as Node)) {
            setToolOpen(false);
        }
    };
	
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

			const status = message.user_side || message.user_id === userId;
		
    const messageClass = isToolOpen ? `${style.message} ${!status ? style.message_visitor : style.message_owner} ${style.highlighted_message}` : `${style.message} ${!status ? style.message_visitor : style.message_owner}`;
		const titleClass =	message.role >= 2 && message.role < 4 ? `${style['title-admin']}` : '';
    return (
        <div
            ref={messageRef}
            key={message.message_id}
            className={messageClass}
            onClick={()=>handleToggleTool()}
        >
            {!status && (
                <div className={style.avatar}>
                    <img src={`${backendURL}${message.user_avatar}`} alt="Avatar" />
                </div>
            )}
            <div className={style.message_content}>
                {!status && <h5 className={titleClass}>{message.name}</h5>}
                <p>{message.message}</p>
                <time>{message.time_send}</time>
            </div>
            <div className={style.tools}>
                {isToolOpen && <UserTools message={message}/>}
            </div>
        </div>
    );
};
