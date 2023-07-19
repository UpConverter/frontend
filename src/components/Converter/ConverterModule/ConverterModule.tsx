import {
    type AttemptUpconverters,
    useGetLastAttemptAttemptsLastGetQuery,
    useGetLastAttemptUpconvertersAttemptsLastUpconvertersGetQuery,
    useUpdateExistingDeviceStateDevicesDeviceIdStatePutMutation,
} from '@api/generatedApi';
import { getRouteSettings } from '@app/providers/AppRouter';
import { CustomButton } from '@components/UI/CustomButton';
import { useAppDispatch } from '@hooks/useAppDispatch';
import Crop54Icon from '@mui/icons-material/Crop54';
import GridViewIcon from '@mui/icons-material/GridView';
import { Alert, Box, Button, Snackbar, Typography } from '@mui/material';
import { attemptActions, getAttemptToken } from '@store/entities/attempt';
import { ERROR_SUCCESS_ATTEMPT_BEGIN, ERROR_SUCCESS_ATTEMPT_END } from '@store/entities/attempt/constants/errors';
import { getIsModuleView, upconverterActions } from '@store/entities/upconverter';
import { ERROR_MANY_CAL_STATE } from '@store/i18n/devices';
import type { FC } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { ConverterItem } from '../ConverterItem/ConverterItem';
import styles from './ConverterModule.module.css';
type ConverterModuleProps = {
    attemptUpconverters: AttemptUpconverters;
};

export const ConverterModule: FC<ConverterModuleProps> = ({ attemptUpconverters }) => {
    const dispatch = useAppDispatch();
    const isModuleView = useSelector(getIsModuleView);
    const attemptToken = useSelector(getAttemptToken);
    const { data: lustAttempt, refetch: refetchLastAttempt } = useGetLastAttemptAttemptsLastGetQuery();
    const { refetch: refetchLastUpconverters } = useGetLastAttemptUpconvertersAttemptsLastUpconvertersGetQuery();
    const [updateState] = useUpdateExistingDeviceStateDevicesDeviceIdStatePutMutation();
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [message, setMessage] = useState('');

    const handleSnackbarClose = () => {
        setShowSnackbar(false);
    };

    const handleViewChange = () => {
        dispatch(upconverterActions.setIsModuleView(!isModuleView));
    };

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
        console.log('HANDLED STARTED ASD ASD A');
        console.log(attemptToken);
        if (attemptToken) {
            if (newState === 'CAL' && lustAttempt?.config_upconv.some((device) => device.state_name === newState)) {
                console.error(ERROR_MANY_CAL_STATE);
                setMessage(ERROR_MANY_CAL_STATE);
                setShowSnackbar(true);

                return;
            }
            updateState({
                deviceId: deviceId,
                newState: newState,
                attemptToken: attemptToken,
            })
                .unwrap()
                .then((response) => {
                    dispatch(attemptActions.setAttemptToken(response.attempt_token));
                    refetchLastAttempt();
                    refetchLastUpconverters();
                })
                .catch((error) => {
                    console.error(error);
                    setMessage(error.data?.detail || 'Ошибка изменения состояния устройства');
                    setShowSnackbar(true);
                });
        }
    };

    return (
        <Box>
            <Box className={styles.converterHeader}>
                <Typography className={styles.text}>{attemptUpconverters.cal}</Typography>
                <CustomButton onClick={handleViewChange}>
                    {isModuleView ? <Crop54Icon /> : <GridViewIcon />}
                </CustomButton>
            </Box>
            <Box className={styles.listContainer}>
                {attemptUpconverters.upconverters.map((upconv, idx) => (
                    <ConverterItem
                        device={upconv}
                        key={idx}
                        onStateUpdate={handleStateUpdate}
                    />
                ))}
            </Box>
            <Snackbar
                autoHideDuration={3000}
                open={showSnackbar}
                onClose={handleSnackbarClose}
            >
                <Alert
                    severity={'error'}
                    onClose={handleSnackbarClose}
                >
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    );
};
