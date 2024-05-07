export interface MessageData {
  id: number;
  name: string;
  avatar: string;
  message_id: number;
	message:number;
  time_send: string;
  visitor: boolean;
  user_side?: boolean;
	user_id: number | string;
	user_avatar: string;
	role: number;
	setIsEditing?: any;
}

