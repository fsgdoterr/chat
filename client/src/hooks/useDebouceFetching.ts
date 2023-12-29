import { useEffect } from "react";
import { useDebounce } from "./useDebounce";
import { useFetching } from "./useFetching";


export type TUseDebounceFetching = <T extends (...args: any[]) => Promise<unknown> | unknown>(
    callback: T,
    value: any,
    delay?: number,
    finallyCallback?: () => void,
) => [
    () => Promise<void>,
    boolean,
    boolean,
];

export const useDebounceFetching: TUseDebounceFetching = (
    callback,
    value,
    delay = 1000,
    finallyCallback
) => {

    const [debouncedValue, isDebounceLoading] = useDebounce(value, delay);

    const [fetching, isLoading] = useFetching(callback, finallyCallback);

    useEffect(() => {
        if(debouncedValue) {
            fetching();
        }
    }, [debouncedValue])

    return [fetching, isDebounceLoading, isLoading];
}