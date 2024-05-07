import axios from 'axios';
import { backendURL } from './api_config';

export const getUserInfo = async (token: string) => {
  try {
    const response = await axios.post(`${backendURL}/user/me`, {
      token: token
    });

    if (response.status !== 200) {
      throw new Error('Response not ok');
    }

    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    console.error('Ошибка:', error);
    return null; // Возвращаем null в случае ошибки
  }
};
