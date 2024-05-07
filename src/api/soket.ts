import { backendSoketURL } from "./api_config";

// Подключение к серверу по веб-сокету
export const socket = new WebSocket(backendSoketURL);

// Открываем соединение с сервером
socket.onopen = () => {
	console.log('Соединение установлено!');
};
// Закрытие соединения с сервером
socket.onclose = () => {
  console.log('Соединение закрыто');
};






