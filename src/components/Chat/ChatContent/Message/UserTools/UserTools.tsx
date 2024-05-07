import style from './UserTools.module.scss';
import { MailX } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { deleteMessage } from '../../../../../api/delete_message';
import { useSessionStorage } from '../../../../../hooks/use_session_storage';
import { getUserInfo } from '../../../../../api/get_user_info';
import { useState } from 'react';
import { EditModal } from './EditModal/EditModal';
import UseLocalStorage from '../../../../../hooks/use_local_storage';


type MessageProps = {
	message: MessageData;
};

export const UserTools = ({ message }: MessageProps) => {
	const { value } = useSessionStorage('access_token');
	const [isRole, setIsRole] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [userId] = UseLocalStorage('user_id', '');
	const myId = userId == message.user_id || message.user_side; 

	getUserInfo(value)
		.then((res) => {
			if (res.role > 1 && res.role < 4) {
				setIsRole(true)
			}
			else {
				return;
			}
		})
		.catch(() => {
			return;
		});



	const editMessageBtn = () => {
		setIsEditing(true);
		
	}

	const deliteMessageBtn = () => {
		deleteMessage(value, message.message_id)
	}
	//editMessage('sfaf0', 5)



	return (
		<>
			<div className={style.user_tools}>
				{myId && <button onClick={() => editMessageBtn()}><Pencil /></button>}
				{isRole && <button onClick={() => deliteMessageBtn()}><MailX /></button>}
			</div>
			{isEditing && <EditModal message={message} setIsEditing={setIsEditing}/>}
		</>
	);
};
