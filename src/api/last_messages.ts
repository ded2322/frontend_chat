import axios from 'axios';
import { backendURL } from './api_config';

export const lastMessages = async () => {
  try {
    const response = await axios.get(`${backendURL}/routers/last_messages`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status !== 200) {
      throw new Error('Response not ok');
    }

    return response.data;
  } catch (error) {
    console.error('Ошибка:', error);
  }
};
