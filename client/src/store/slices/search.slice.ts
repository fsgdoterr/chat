import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUser from "../../types/models/IUser";

interface ISearchSlice {
    search: string;
    chats: IUser[];
    totalCount: number;
    isLoading: boolean;
}

const initialState: ISearchSlice = {
    search: '',
    chats: [],
    totalCount: 0,
    isLoading: false,
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearch(initialState, action: PayloadAction<string>) {
            initialState.search = action.payload;
        },
        setChats(initialState, action: PayloadAction<IUser[]>) {
            initialState.chats = action.payload;
        },
        setTotalCount(initialState, action: PayloadAction<number>) {
            initialState.totalCount = action.payload;
        },
        setIsLoading(initialState, action: PayloadAction<boolean>) {
            initialState.isLoading = action.payload;
        },
    }
});

export const {
    setSearch,
    setChats,
    setTotalCount,
    setIsLoading
} = searchSlice.actions;

export default searchSlice.reducer;