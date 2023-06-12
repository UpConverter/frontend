import { Box, InputLabel } from '@mui/material';
import type { FC } from 'react';

import styles from './LabelLine.module.css';

type LineProps = {
    label?: string;
    size?: 'small' | 'medium';
    children_direction?: 'row' | 'column';
    children: React.ReactNode;
    className?: string;
};

export const LabelLine: FC<LineProps> = ({ label, size, children, children_direction, className }) => {
    let labelClass = styles.label;
    let mainContainer = styles.mainContainer;
    let childrenContainer = styles.rowContainer;

    if (size === 'small') {
        labelClass = styles.labelSmall;
        mainContainer = styles.mainSmallContainer;
    } else if (size === 'medium') {
        labelClass = styles.labelMedium;
    }

    if (children_direction === 'column') {
        childrenContainer = styles.columnContainer;
    }

    return (
        <Box className={`${mainContainer} ${className}`}>
            {label && (
                <Box className={labelClass}>
                    <InputLabel>{label}</InputLabel>
                </Box>
            )}
            <Box className={childrenContainer}>{children}</Box>
        </Box>
    );
};
