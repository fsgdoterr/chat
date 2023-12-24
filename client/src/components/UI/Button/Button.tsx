import React, { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'
import styles from './Button.module.scss';
import Spinner from '../Spinner/Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    transparent?: boolean;
    loading?: boolean;
    variant?: 'circle' | 'default';
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
    children,
    className,
    transparent,
    loading,
    disabled,
    variant = 'circle',
    ...rest
}) => {

    const buttonClasses = [styles.button];
    buttonClasses.push(styles[variant]);
    if(transparent) buttonClasses.push(styles.transparent)
    if(loading) buttonClasses.push(styles.loading);
    if(className) buttonClasses.push(className);
    

    return (
        <button 
            className={buttonClasses.join(' ')}
            disabled={disabled || loading}
            {...rest}
        >
            {loading &&
                <div className={styles.loader}>
                    <Spinner 
                        size={20}
                    />
                </div>
            }
            <div className={styles.inner}>
                {children}
            </div>
        </button>
    )
}

export default Button