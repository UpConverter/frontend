import { Box, InputLabel } from '@mui/material';
import type { FC } from 'react';

import styles from './LabelLine.module.css';

type LineProps = {
    label: string;
    children: React.ReactNode;
};

export const LabelLine: FC<LineProps> = ({ label, children }) => {
    return (
        <Box className={styles.rowContainer}>
            <Box className={styles.label}>
                <InputLabel>{label}</InputLabel>
            </Box>
            <Box className={styles.children}>{children}</Box>
        </Box>
    );
};
