interface MessageData {
  id: number;
  name: string;
  avatar: string;
  message_id: number;
	message: number;
  time_send: string;
  visitor: boolean;
	user_id: number | string;
	user_avatar: string;
	role: number;
	user_side?: boolean;
	event?: any;
	setIsEditing?: any;
}