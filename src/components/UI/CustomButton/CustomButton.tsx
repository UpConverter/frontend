import type { ButtonProps } from '@mui/material';
import { Button } from '@mui/material';
import type { FC } from 'react';

import styles from './CustomButton.module.css';

type CustomButtonProps = ButtonProps & {
    children: React.ReactNode;
};

export const CustomButton: FC<CustomButtonProps> = ({ children, className = '', ...props }) => {
    const buttonClassName = className ? `${className} ${styles.submitButton}` : styles.submitButton;

    return (
        <Button
            {...props}
            className={buttonClassName}
        >
            {children}
        </Button>
    );
};
