import { useGetLastAttemptAttemptsLastGetQuery } from '@api/generatedApi';
import { Header } from '@components/Header';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { Box } from '@mui/material';
import { attemptActions } from '@store/entities/attempt';
import type { FC } from 'react';

import styles from './App.module.css';
import { AppRouter } from './providers/AppRouter';
export const App: FC = () => {
    const dispatch = useAppDispatch();
    const { data: lustAttempt } = useGetLastAttemptAttemptsLastGetQuery();
    dispatch(attemptActions.setAttempt(lustAttempt));

    return (
        <div>
            <Header />
            <Box className={styles.mainContainer}>
                <AppRouter />
            </Box>
        </div>
    );
};
