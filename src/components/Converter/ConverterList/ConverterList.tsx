import {
    useGetLastAttemptAttemptsLastGetQuery,
    useUpdateExistingDeviceStateDevicesDeviceIdStatePutMutation,
} from '@api/generatedApi';
import { getRouteSettings } from '@app/providers/AppRouter';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { Box, Button, Typography } from '@mui/material';
import { attemptActions, getAttemptToken } from '@store/entities/attempt';
import { ERROR_SUCCESS_ATTEMPT_BEGIN, ERROR_SUCCESS_ATTEMPT_END } from '@store/entities/attempt/constants/errors';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { ConverterItem } from '../ConverterItem/ConverterItem';
import styles from './ConverterList.module.css';

export const ConverterList = () => {
    const dispatch = useAppDispatch();
    const { data: lustAttempt, refetch: refetchLastAttempt } = useGetLastAttemptAttemptsLastGetQuery();
    const attemptToken = useSelector(getAttemptToken);
    const [updateState] = useUpdateExistingDeviceStateDevicesDeviceIdStatePutMutation();

    if (!attemptToken) {
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
        if (attemptToken) {
            updateState({
                deviceId: deviceId,
                newState: newState,
                attemptToken: attemptToken,
            })
                .unwrap()
                .then((response) => {
                    // onClose();
                    console.log(response);
                    dispatch(attemptActions.setAttemptToken(response.attemptToken));
                    refetchLastAttempt();
                })
                .catch((error) => {
                    console.error(error);
                    // setMessage(error.data?.detail || 'Ошибка создания устройства');
                    // setShowSnackbar(true);
                });
        }
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
