import axios from 'axios';
import { backendURL } from './api_config';

export const userDelete = async (token: string) => {
  try {
    const response = await axios.delete(`${backendURL}/user/delete`, {
      data: {
        token: token // Передача токена в теле запроса
      }
    });

    if (response.status !== 204) {
      alert('Пользователь удалён')
			return response.data; // Возвращаем данные из ответа
    }
		
  } catch (error) {
    console.error('Ошибка:', error);
    return null; // Возвращаем null в случае ошибки
  }
};
