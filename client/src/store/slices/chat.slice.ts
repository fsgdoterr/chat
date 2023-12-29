import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUser from "../../types/models/IUser";

interface IChatSlice {
    selected: string;
}

const initialState: IChatSlice = {
    selected: '',
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setSelected(initialState, action: PayloadAction<string>) {
            initialState.selected = action.payload;
        },
    }
});

export const {
    setSelected
} = chatSlice.actions;

export default chatSlice.reducer;