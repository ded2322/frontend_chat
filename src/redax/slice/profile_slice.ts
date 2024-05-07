import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
	name: 'profile',
	initialState: {
		name: '',
		nameColor: '#000000',
	},
	reducers: {
		setName: (state, action) => {
			state.name = action.payload;
		},
		setNameColor: (state, action) => {
			state.nameColor = action.payload;
		},
	},
});

export const { setName, setNameColor } = profileSlice.actions;
export default profileSlice.reducer;
