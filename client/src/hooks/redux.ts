import { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, AppStore } from "../store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


export const useAppSelector: TypedUseSelectorHook<AppStore> = useSelector;

export const useAppDispatch: () => AppDispatch = useDispatch;