import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import style from './Emoji.module.scss';

export const EmojiPicker = (props: any) => {
	return (
		<div className={style.picker}>
			<Picker
				data={data}
				onEmojiSelect={(emoji: any) => {
					props.setData(props.data + emoji.native);
				}}
			/>
		</div>
	);
};


