import {
    useDeleteExistingDeviceDevicesDeviceIdDeleteMutation,
    useGetDevicesByTypeRelatedDevicesByTypeRelatedGetQuery,
} from '@api/generatedApi';
import { DevicesGrid } from '@components/Settings/DevicesGrid/DevicesGrid';
import { ConfirmModal } from '@components/UI/ConfirmModal/ConfirmModal';
import { CustomButton } from '@components/UI/CustomButton/CustomButton';
import { Alert, Box, InputLabel, Snackbar } from '@mui/material';
import { DeviceType } from '@store/entities/attempt/types/DeviceSchema';
import {
    AVALIABLE_CALS,
    AVALIABLE_UPCONVERTERS,
    ERROR_DELETE_DEVICE,
    NEW_CAL,
    NEW_UPCONVERTER,
    SUCCESS_DELETE_DEVICE,
} from '@store/i18n/devices';
import { useState } from 'react';

import styles from './SettingsDevices.module.css';

export const SettingsDevices = () => {
    const { data: cals, isLoading: isCalsLoading } = useGetDevicesByTypeRelatedDevicesByTypeRelatedGetQuery({
        typeName: DeviceType.CAL,
        skip: 0,
        limit: 100,
    });
    const { data: upconverters, isLoading: isUpconvertersLoading } =
        useGetDevicesByTypeRelatedDevicesByTypeRelatedGetQuery({
            typeName: DeviceType.UPCONV,
            skip: 0,
            limit: 100,
        });

    const [deletingDevice, setDeletingDevice] = useState<any>(-1);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [deleteDevice] = useDeleteExistingDeviceDevicesDeviceIdDeleteMutation();

    const handleSnackbarClose = () => {
        setShowSnackbar(false);
    };

    const handleDeleteConnection = (params: any) => {
        setDeletingDevice(params.row);
        setDeleteConfirmationOpen(true);
    };

    const handleDeleteConfirmationCancel = () => {
        setDeleteConfirmationOpen(false);
    };

    const handleDeleteConfirmation = () => {
        deleteDevice({ deviceId: deletingDevice.id })
            .unwrap()
            .then((response) => {
                const { message } = response;
                setMessage(message ? SUCCESS_DELETE_DEVICE : ERROR_DELETE_DEVICE);
                setShowSnackbar(true);
            })
            .catch((error) => {
                setMessage(ERROR_DELETE_DEVICE);
                setShowSnackbar(true);
                console.error(error);
            });
        setDeleteConfirmationOpen(false);
    };

    return (
        <Box className={styles.mainContainer}>
            <Box className={styles.mr}>
                <Box className={styles.inlineContainer}>
                    <InputLabel>{AVALIABLE_CALS}</InputLabel>
                    <CustomButton variant='outlined'>{NEW_CAL}</CustomButton>
                </Box>
                <DevicesGrid
                    devices={cals}
                    isLoading={isCalsLoading}
                    type_name={DeviceType.CAL}
                    onRowDelete={handleDeleteConnection}
                />
            </Box>
            <Box>
                <Box className={styles.inlineContainer}>
                    <InputLabel>{AVALIABLE_UPCONVERTERS}</InputLabel>
                    <CustomButton variant='outlined'>{NEW_UPCONVERTER}</CustomButton>
                </Box>
                <DevicesGrid
                    devices={upconverters}
                    isLoading={isUpconvertersLoading}
                    type_name={DeviceType.UPCONV}
                    onRowDelete={handleDeleteConnection}
                />
            </Box>
            <ConfirmModal
                content={`Вы уверены, что хотите удалить устройство ${deletingDevice.name}?`}
                isOpen={deleteConfirmationOpen}
                title={'Подтверждение удаления'}
                onClose={handleDeleteConfirmationCancel}
                onConfirm={handleDeleteConfirmation}
            />
            <Snackbar
                autoHideDuration={3000}
                open={showSnackbar}
                onClose={handleSnackbarClose}
            >
                <Alert
                    severity={message === SUCCESS_DELETE_DEVICE ? 'success' : 'error'}
                    onClose={handleSnackbarClose}
                >
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    );
};
