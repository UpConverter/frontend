import { Box, Typography } from '@mui/material';
import type { FC } from 'react';

import styles from './ConverterHeader.module.css';
export const ConverterHeader: FC = () => {
    return (
        <Box className={styles.converterHeader}>
            <Typography className={styles.text}>Module 1</Typography>
        </Box>
    );
};
