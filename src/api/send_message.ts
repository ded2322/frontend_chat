import { socket } from "./soket";


export function sendMessage(messageText: string, token: string) {

	const message = {
		"message": messageText,
		"token": token
	};
	socket.send(JSON.stringify(message));
}