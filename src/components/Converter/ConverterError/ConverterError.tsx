import { getRouteSettings } from '@app/providers/AppRouter';
import { Box, Button, Typography } from '@mui/material';
import { ERROR_SUCCESS_ATTEMPT_BEGIN, ERROR_SUCCESS_ATTEMPT_END } from '@store/entities/attempt/constants/errors';
import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import styles from './ConverterError.module.css';

type ConverterErrorProps = {
    message?: string;
};

export const ConverterError: FC<ConverterErrorProps> = ({ message }) => {
    return (
        <Box className={styles.errorContainer}>
            <Box className={styles.errorBox}>
                <Typography
                    gutterBottom
                    variant='h6'
                >
                    {message ? message : ERROR_SUCCESS_ATTEMPT_BEGIN}
                </Typography>

                <Button
                    className={styles.button}
                    color='primary'
                    component={RouterLink}
                    to={getRouteSettings()}
                    variant='contained'
                >
                    {ERROR_SUCCESS_ATTEMPT_END}
                </Button>
            </Box>
        </Box>
    );
};
