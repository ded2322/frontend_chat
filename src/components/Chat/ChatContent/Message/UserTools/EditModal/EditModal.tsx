import { useRef, useState } from 'react';
import style from './EditModal.module.scss';
import { useSessionStorage } from '../../../../../../hooks/use_session_storage';
import { editMessage } from '../../../../../../api/edit_message';

type MessageProps = {
  message: MessageData;
  setIsEditing: (value: boolean) => void;
};

export const EditModal = ({ message, setIsEditing}: MessageProps) => {
	const { value } = useSessionStorage('access_token');
	const [isText, setisText] = useState(message.message);
	const editFormRef = useRef<HTMLTextAreaElement>(null);

	const  handleSubmit = () => {
	if(editFormRef.current && editFormRef.current.value){
			editMessage(value, message.message_id, editFormRef.current.value)
			setIsEditing(false)
		}
	}

	const onChangeText = (event: any) => {
    setisText(event.target.value);
  };
	return (
		<div className={style.modal}>
			<textarea 
				ref={editFormRef} 
				value={isText}
				onChange={onChangeText}
			/>

			<button onClick={handleSubmit}>Сохранить</button>
		
		</div>
	)
};
