import React, { FC, PropsWithChildren } from 'react'
import styles from './FormError.module.scss';

interface FormErrorProps {
    className?: string;
    style?: React.CSSProperties;
}

const FormError: FC<PropsWithChildren<FormErrorProps>> = ({
    children,
    className,
    style
}) => {
    return (
        <p 
            className={[styles.error, className].join(' ')}
            style={style}
        >
            {children}
        </p>
    )
}

export default FormError