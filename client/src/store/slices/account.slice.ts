import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IAccount from "../../types/models/IAccount";

interface IAccountSlice {
    isAuth: boolean;
    firstLoad: boolean;
    user?: IAccount;
}

const initialState: IAccountSlice = {
    isAuth: false,
    firstLoad: false,
    user: undefined,
}

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setIsAuth(initialState, action: PayloadAction<boolean>) {
            initialState.isAuth = action.payload;
        },
        setFirstLoad(initialState, action: PayloadAction<boolean>) {
            initialState.firstLoad = action.payload;
        },
        setUser(initialState, action: PayloadAction<undefined |IAccount>) {
            initialState.user = action.payload;
        },
    }
});

export const {
    setIsAuth,
    setUser,
    setFirstLoad
} = accountSlice.actions;

export default accountSlice.reducer;