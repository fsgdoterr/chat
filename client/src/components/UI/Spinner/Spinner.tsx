import React, { FC } from 'react'
import styles from './Spinner.module.scss';

interface SpinnerProps {
    size?: number;
}

const Spinner: FC<SpinnerProps> = ({
    size = 20,
}) => {

    return (
        <div 
            style={{width: size, height: size}}
            className={styles.ring}
        >
            <div
                style={{width: size, height: size}}
            >

            </div>
            <div 
                style={{width: size, height: size}}
            >
            </div>
            <div 
                style={{width: size, height: size}}
            >
            </div>
            <div 
                style={{width: size, height: size}}
            >
            </div>
        </div>
    )
}

export default Spinner