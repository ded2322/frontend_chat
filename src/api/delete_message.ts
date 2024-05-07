import axios, { AxiosError } from "axios";
import { backendURL } from "./api_config";

interface MessageData {
  token: string;
  id_message: number;
}

export const deleteMessage = async (token: string, id: number) => {
  const data: MessageData = {
    token: token,
    id_message: id,
  };

  try {
    await axios.delete(`${backendURL}/routers/delete-message`, {
      data: data,
    });

  } catch (error) {
    const err = error as AxiosError;

    if (err.response?.status === 409) {
      alert("Нет прав");
    } else {
      console.error("Ошибка", err.message);
    }
  }
};
