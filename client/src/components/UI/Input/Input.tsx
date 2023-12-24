import React, { FC, InputHTMLAttributes, forwardRef, useState } from 'react'
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    beforeInput?: JSX.Element;
    afterInput?: JSX.Element;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    className,
    beforeInput,
    afterInput,
    onFocus,
    onBlur,
    ...rest
}, ref) => {

    const [focus, setFocus] = useState<boolean>(false);

    const inputClasses = [styles.input, className];
    if(beforeInput) inputClasses.push(styles.beforeInput);
    if(afterInput) inputClasses.push(styles.afterInput);
    if(focus) inputClasses.push(styles.focus);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setFocus(true);
        onFocus?.(e);
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setFocus(false);
        onBlur?.(e);
    }

    return (
        <div className={inputClasses.join(' ')}>
            {beforeInput && <div className={styles.beforeInput}>{beforeInput}</div>}
            <input 
                {...rest}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={ref}
            />
            {afterInput && <div className={styles.afterInput}>{afterInput}</div>}
        </div>
    )
})

export default Input