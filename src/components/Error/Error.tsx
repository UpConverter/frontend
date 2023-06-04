import { Button } from '@mui/material';
import type { FC } from 'react';

import styles from './Error.module.css';

const Error: FC = () => {
    const onReloadClick = () => {
        location.reload();
    };

    return (
        <div className={styles.error}>
            <h2 className={styles.header}>Произошла непредвиденная ошибка</h2>
            <Button
                variant='contained'
                onClick={onReloadClick}
            >
                Обновить страницу
            </Button>
        </div>
    );
};

export default Error;
