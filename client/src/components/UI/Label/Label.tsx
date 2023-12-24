import React, { FC, PropsWithChildren } from 'react'
import styles from './Label.module.scss';

interface LabelProps {
    label: string;
}

const Label: FC<PropsWithChildren<LabelProps>> = ({
    children,
    label
}) => {
    return (
        <label className={styles.label}>
            <span className={styles.labelspan}>{label}</span>
            {children}
        </label>
    )
}

export default Label