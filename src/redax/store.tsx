import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './slice/message_add_slice';
import backgroundReducer from './slice/background_slice'
import themeReducer from './slice/theme_slice'
import profileReducer from './slice/profile_slice';

export const store = configureStore({
  reducer: {
    chat: messagesReducer,
		background: backgroundReducer,
		theme: themeReducer,
		profile: profileReducer,
  },
});
