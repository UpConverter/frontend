import { Header } from '@components/Header';
import { Box } from '@mui/material';
import type { FC } from 'react';

import styles from './App.module.css';
import { AppRouter } from './providers/AppRouter';
export const App: FC = () => {
    return (
        <div>
            <Header />
            <Box className={styles.mainContainer}>
                <AppRouter />
            </Box>
        </div>
    );
};
