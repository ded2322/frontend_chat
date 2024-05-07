import { useState, useEffect, useRef } from 'react';
import { socket } from '../../../api/soket';
import style from './ChatContent.module.scss';
import { Message } from './Message/Message';
import { lastMessages } from '../../../api/last_messages';
import { loadMessages } from '../../../api/load_messages';
import useLocalStorage from '../../../hooks/use_local_storage';


export function ChatContent() {
	const [messages, setMessages] = useState<MessageData[]>([]);
	
	const [isHandlerActive, setIsHandlerActive] = useState(true);
	const messagesRef = useRef<HTMLDivElement>(null);
	const [messageId, setMessageId] = useLocalStorage('MessageId', 0);
	//const [userId] = useLocalStorage('user_id', '');

	/*useEffect(() => {
		const handleReload = async () => {
			if (!userId) {
				await new Promise(resolve => setTimeout(resolve, 1000)); // Тормозим выполнение на 1 секунду
				window.location.reload();
			}
		};
	
		handleReload();
	}, []); */
	

	const fetchMessages = async () => {
		try {
			if(messageId === undefined) setMessageId(0);
			const response = await loadMessages(messageId);
			if (response.length === 0) return;
			setMessages((prevMessages) => [...prevMessages, ...response]);
			setMessageId(response[response.length - 1].message_id);
		} catch (error) {
			console.error('Ошибка получения сообщений:', error);
			setMessageId(0);
		}
	};
	

	const handleScroll = () => {
		if (isHandlerActive && messagesRef.current && messagesRef.current.scrollTop <= 10) {
			setIsHandlerActive(false);
			fetchMessages();

			setTimeout(() => {
				setIsHandlerActive(true);
			}, 5000);
		}
	};

 

	useEffect(() => {
		const fetchInitialMessages = async () => {
			try {
				if(messageId === undefined) setMessageId(0);
				const response = await lastMessages();
				setMessages(response);
				setMessageId(response[response.length - 1].message_id);
				scrollBottom();
			} catch (error) {
				console.error('Ошибка получения сообщений:', error);
				setMessageId(0);
			}
		};
		fetchInitialMessages();
	}, []);

	useEffect(() => {
		if (messagesRef.current) {
			const maxScroll = messagesRef.current.scrollHeight - messagesRef.current.clientHeight;
			if (messagesRef.current.scrollTop >= maxScroll - 200) {
				messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
			}
		}
	}, [messages]);

	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			const receivedMessage = JSON.parse(event.data) as MessageData;
			if (receivedMessage.event) return; 
			setMessages((prevMessages) => [receivedMessage, ...prevMessages]);
		};

		socket.onmessage = handleMessage;

		return () => {
			socket.removeEventListener('message', handleMessage);
		};
	}, []);

	useEffect(() => {
		const handleMessage = (event: any) => {

			const data = JSON.parse(event.data);
			if (data.event === 'delete') {
				setMessages((messages) => messages.filter((m) => m.message_id !== data.message_id));
			} else if (data.event === 'update') {
				setMessages((messages) => messages.map((message) => {
					if (message.message_id === data.message_id) {
						return { ...message, message: data.new_message };
					}
					return message;
				}));
			}
		};

		socket.addEventListener('message', handleMessage);

		return () => {
			socket.removeEventListener('message', handleMessage);
		};

	}, []);

const scrollBottom = ()=> {
	if(messagesRef.current) {
		messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
	}
}
    
	return (
		<div className={style.chat_content}>
			<div ref={messagesRef} onScroll={handleScroll} className={style.messages}>
				{[...messages].reverse().map((message, index) => (
					<Message key={index} message={message}  />
				))}
			</div>
		</div>
	);
}
