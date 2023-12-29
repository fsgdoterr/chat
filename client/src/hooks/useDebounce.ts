import { useEffect, useRef, useState } from "react"


export const useDebounce = (value: any, delay: number = 1000) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [debouncedValue, setDebouncedValue] = useState<any>(value);
    const timeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if(timeout.current) clearTimeout(timeout.current);
        setIsLoading(true);
        
        timeout.current = setTimeout(() => {
            setDebouncedValue(value);
            setIsLoading(false);
        }, delay);
    }, [value]);

    return [debouncedValue, isLoading];
}