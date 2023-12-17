import { useAppSelector } from "./redux";


export const useIsAuth = () => useAppSelector(state => state.account.isAuth);

export const useFirstLoad = () => useAppSelector(state => state.account.firstLoad);