import { configureStore } from '@reduxjs/toolkit';
import accountSlice from './slices/account.slice';

const store = configureStore({
    reducer: {
        account: accountSlice,
    },
});

export type AppStore = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;