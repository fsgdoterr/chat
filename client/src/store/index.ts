import { configureStore } from '@reduxjs/toolkit';
import accountSlice from './slices/account.slice';
import searchSlice from './slices/search.slice';
import chatSlice from './slices/chat.slice';

const store = configureStore({
    reducer: {
        account: accountSlice,
        search: searchSlice,
        chat: chatSlice,
    },
});

export type AppStore = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;