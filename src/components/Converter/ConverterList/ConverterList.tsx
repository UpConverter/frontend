import {
    useGetLastAttemptAttemptsLastGetQuery,
    useUpdateExistingDeviceStateDevicesDeviceIdStatePutMutation,
} from '@api/generatedApi';
import { getRouteSettings } from '@app/providers/AppRouter';
import { Box, Button, Typography } from '@mui/material';
import { getAttemptSuccess } from '@store/entities/attempt';
import { ERROR_SUCCESS_ATTEMPT_BEGIN, ERROR_SUCCESS_ATTEMPT_END } from '@store/entities/attempt/constants/errors';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { ConverterItem } from '../ConverterItem/ConverterItem';
import styles from './ConverterList.module.css';

export const ConverterList = () => {
    const { data: lustAttempt, refetch: refetchLastAttempt } = useGetLastAttemptAttemptsLastGetQuery();
    const attemptSuccess = useSelector(getAttemptSuccess);
    const [updateState] = useUpdateExistingDeviceStateDevicesDeviceIdStatePutMutation();

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

    const handleStateUpdate = (deviceId: number, newState: string) => {
        if (lustAttempt) {
            updateState({
                deviceId: deviceId,
                updateDeviceState: {
                    config_cals: lustAttempt.config_cals,
                    config_upconv: lustAttempt.config_upconv,
                    port: lustAttempt.attempt.port,
                    speed: lustAttempt.attempt.speed,
                    state: newState,
                },
            })
                .unwrap()
                .then((response) => {
                    // onClose();
                    console.log(response);
                })
                .catch((error) => {
                    console.error(error);
                    // setMessage(error.data?.detail || 'Ошибка создания устройства');
                    // setShowSnackbar(true);
                });
        }
        refetchLastAttempt();
    };

    return (
        <Box className={styles.listContainer}>
            {lustAttempt?.config_upconv.map((upconv, idx) => (
                <ConverterItem
                    device={upconv}
                    key={idx}
                    onStateUpdate={handleStateUpdate}
                />
            ))}
        </Box>
    );
};
