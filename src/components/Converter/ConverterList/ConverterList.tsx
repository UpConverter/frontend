import { getRouteSettings } from '@app/providers/AppRouter';
import { Box, Button, Typography } from '@mui/material';
import { getAttemptSuccess, getAttemptUpconv } from '@store/entities/attempt';
import { ERROR_SUCCESS_ATTEMPT_BEGIN, ERROR_SUCCESS_ATTEMPT_END } from '@store/entities/attempt/constants/errors';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { ConverterItem } from '../ConverterItem/ConverterItem';
import styles from './ConverterList.module.css';

export const ConverterList = () => {
    const attemptSuccess = useSelector(getAttemptSuccess);
    const upconverters = useSelector(getAttemptUpconv);

    if (!attemptSuccess) {
        return (
            <Box className={styles.errorContainer}>
                <Box className={styles.errorBox}>
                    <Typography
                        gutterBottom
                        variant='h6'
                    >
                        {ERROR_SUCCESS_ATTEMPT_BEGIN}
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
    }

    return (
        <Box className={styles.listContainer}>
            {upconverters.map((upconv, idx) => (
                <ConverterItem
                    connected_to_device={upconv.connected_to_device}
                    connected_to_device_channel={upconv.connected_to_device_channel}
                    device={upconv.device}
                    device_id={upconv.device_id}
                    id={upconv.id}
                    key={idx}
                    state_name={upconv.state_name}
                />
            ))}
        </Box>
    );
};
