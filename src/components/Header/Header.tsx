import { useGetLastAttemptAttemptsLastGetQuery } from '@api/generatedApi';
import { Menu } from '@components/Menu/Menu';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { attemptActions } from '@store/entities/attempt';
import { type FC, useEffect } from 'react';

import styles from './Header.module.css';
export const Header: FC = () => {
    const dispatch = useAppDispatch();
    const { data: lustAttempt } = useGetLastAttemptAttemptsLastGetQuery();
    useEffect(() => {
        dispatch(attemptActions.setAttempt(lustAttempt));
    }, [lustAttempt, dispatch]);

    return (
        <div className={styles.header}>
            <div className={styles.menu}>
                <Menu />
            </div>
        </div>
    );
};
