import axios from 'axios';
import { backendURL } from './api_config';

export const loadMessages = async (id: number) => {
  try {
    const response = await axios.post(`${backendURL}/routers/load`, {
				"id_message": id
    });

    if (response.status !== 200) {
      throw new Error('Response not ok');
    }
		console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Ошибка:', error);
  }
};