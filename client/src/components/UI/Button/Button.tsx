import React, { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    transparent?: boolean;
    loading?: boolean;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
    children,
    className,
    transparent,
    loading,
    disabled,
    ...rest
}) => {

    const buttonClasses = [styles.button, className];
    if(transparent) buttonClasses.push(styles.transparent);
    if(loading) buttonClasses.push(styles.loading);


    return (
        <button 
            className={buttonClasses.join(' ')}
            disabled={disabled || loading}
            {...rest}
        >
            {children}
        </button>
    )
}

export default Button