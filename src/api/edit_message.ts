import axios, { AxiosError } from 'axios';
import { backendURL } from './api_config';

export const editMessage = async (token: string, id: number, message: string) => {
 try {
  await axios.patch(`${backendURL}/routers/update`, {
		"token": token,
		"message_id": id,
		"message": message
  }, {
   headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json'
   }
  });

 } catch (error) {
  const err = error as AxiosError;

  if (err.response?.status === 409) {
   alert('Не корректный токен или ID сообщения');
  } else {
   console.error('Ошибка', err.message);
  }
 }
};
