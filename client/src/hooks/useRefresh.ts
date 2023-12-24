import { useEffect } from "react";
import { useFetching } from "./useFetching"
import { useAppDispatch } from "./redux";
import { setFirstLoad, setIsAuth, setUser } from "../store/slices/account.slice";
import { AuthApi } from "../http/AuthApi";


export const useRefresh = () => {

    const dispatch = useAppDispatch();

    const [fetching, isLoading] = useFetching(async () => {
        const response = await AuthApi.refresh();
        dispatch(setUser(response.data));
        dispatch(setIsAuth(true));
    }, () => dispatch(setFirstLoad(true)));

    useEffect(() => {
        fetching();
    }, []);

    return isLoading;
}