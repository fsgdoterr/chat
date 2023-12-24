import axios from "axios";
import { useState } from "react";

export type TUseFetching = <T extends (...args: any[]) => Promise<unknown> | unknown>(callback: T, finallyCallback?: () => void) => [
    () => Promise<void>,
    boolean,
    unknown
];

export const useFetching: TUseFetching = (
    callback,
    finallyCallback
) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState(null);

    const fetching = async (...args: any[]) => {
        try {
            setIsLoading(true);
            await callback(...args);
            setError(null);
        } catch(e) {
            if(axios.isAxiosError(e)) {
                setError(e.response?.data);
            }
        } finally {
            setIsLoading(false);
            finallyCallback?.();
        }
    }


    return [fetching, isLoading, error];
}
