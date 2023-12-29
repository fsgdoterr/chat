import { setChats, setIsLoading, setSearch } from "../store/slices/search.slice";
import IUser from "../types/models/IUser";
import { useAppDispatch, useAppSelector } from "./redux"


export const useSearch = () => {

    const search = useAppSelector(state => state.search.search);
    const searchedChats = useAppSelector(state => state.search.chats);
    const totalCount = useAppSelector(state => state.search.totalCount);
    const isLoading = useAppSelector(state => state.search.isLoading);

    const dispatch = useAppDispatch();

    const _setSearch = (search: string): any => dispatch(setSearch(search));

    const _setChats = (chats: IUser[]): any => dispatch(setChats(chats));

    const setLoading = (val: boolean): any => dispatch(setIsLoading(val));

    return {
        search,
        setSearch: _setSearch,
        setChats: _setChats,
        searchedChats,
        totalCount,
        isLoading,
        setLoading,
    }
}