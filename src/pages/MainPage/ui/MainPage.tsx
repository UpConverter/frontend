import { ConverterWidget } from '@components/Converter';
import { Box } from '@mui/material';
import type { FC } from 'react';

import styles from './MainPage.module.css';

const MainPage: FC = () => {
    return (
        <Box className={styles.mainPage}>
            <ConverterWidget />
        </Box>
    );
};
export default MainPage;
