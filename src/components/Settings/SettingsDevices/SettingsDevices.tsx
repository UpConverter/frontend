import type { DeviceRelatedCreate } from '@api/generatedApi';
import {
    useDeleteExistingDeviceDevicesDeviceIdDeleteMutation,
    useGetConfigAvaliableDevicesConfigsConfigIdAvaliableDevicesGetQuery,
    useGetConfigConnectionsConfigsConfigIdConnectionsGetQuery,
    useGetDevicesByTypeRelatedDevicesByTypeRelatedGetQuery,
} from '@api/generatedApi';
import { DeviceFormModal } from '@components/Settings/DeviceFormModal/DeviceFormModal';
import { DevicesGrid } from '@components/Settings/DevicesGrid/DevicesGrid';
import { ConfirmModal } from '@components/UI/ConfirmModal/ConfirmModal';
import { CustomButton } from '@components/UI/CustomButton';
import { Alert, Box, InputLabel, Snackbar } from '@mui/material';
import { getAttemptConfigId } from '@store/entities/attempt';
import { DeviceType } from '@store/entities/attempt/types/DeviceSchema';
import {
    AVALIABLE_CALS,
    AVALIABLE_UPCONVERTERS,
    DEVICES_EMPTY,
    ERROR_DELETE_DEVICE,
    SUCCESS_DELETE_DEVICE,
} from '@store/i18n/devices';
import { EDIT_CAL, EDIT_UPCONVERTER, NEW_CAL, NEW_UPCONVERTER } from '@store/i18n/devices';
import { useState } from 'react';
import { useSelector } from 'react-redux';

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
    const configId = useSelector(getAttemptConfigId);
    const { refetch: refetchAvaliableCals } = useGetConfigAvaliableDevicesConfigsConfigIdAvaliableDevicesGetQuery({
        configId: configId || 0,
        typeName: DeviceType.CAL,
    });
    const { refetch: refetchAvaliableUpconv } = useGetConfigAvaliableDevicesConfigsConfigIdAvaliableDevicesGetQuery({
        configId: configId || 0,
        typeName: DeviceType.UPCONV,
    });
    const { refetch: refetchConnections } = useGetConfigConnectionsConfigsConfigIdConnectionsGetQuery({
        configId: configId || 0,
    });
    const [newDeviceOpen, setNewDeviceOpen] = useState(false);
    const [title, setTitle] = useState(NEW_CAL);
    const [currentDeviceId, setCurrentDeviceId] = useState<number | undefined>();
    const [currentDevice, setCurrentDevice] = useState<DeviceRelatedCreate>({
        serial_number: '000000',
        name: 'CAL',
        type_name: DeviceType.CAL,
    });

    const [deletingDevice, setDeletingDevice] = useState<any>(-1);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [deleteDevice] = useDeleteExistingDeviceDevicesDeviceIdDeleteMutation();

    const handleNewDeviceCancel = () => {
        setNewDeviceOpen(false);
    };

    const handleSnackbarClose = () => {
        setShowSnackbar(false);
    };

    const handleDeleteConnection = (row: any) => () => {
        setDeletingDevice(row);
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
        if (configId) {
            refetchConnections();
            deletingDevice.type_name === DeviceType.CAL ? refetchAvaliableCals() : refetchAvaliableUpconv();
        }
        setDeleteConfirmationOpen(false);
    };

    const handleEditConnection = (row: any) => () => {
        const title = row.type_name === DeviceType.CAL ? EDIT_CAL : EDIT_UPCONVERTER;
        setTitle(title);
        setCurrentDevice(row);
        setCurrentDeviceId(row.id);
        setNewDeviceOpen(true);
    };

    const handleAddCal = () => {
        setTitle(NEW_CAL);
        setCurrentDevice({ serial_number: '000000', name: 'CAL', type_name: DeviceType.CAL });
        setNewDeviceOpen(true);
    };

    const handleAddUpconverter = () => {
        setTitle(NEW_UPCONVERTER);
        setCurrentDevice({ serial_number: '000000', name: 'UPCONVERTER', type_name: DeviceType.UPCONV });
        setNewDeviceOpen(true);
    };

    return (
        <Box className={styles.mainContainer}>
            <Box className={styles.mr}>
                <Box className={styles.inlineContainer}>
                    <InputLabel>{AVALIABLE_CALS}</InputLabel>
                    {!isUpconvertersLoading && !upconverters ? (
                        <CustomButton
                            className={styles.button}
                            variant='outlined'
                            onClick={handleAddCal}
                        >
                            Добавить
                        </CustomButton>
                    ) : null}
                </Box>
                <DevicesGrid
                    devices={cals}
                    isLoading={isCalsLoading}
                    type_name={DeviceType.CAL}
                    onRowAdd={handleAddCal}
                    onRowDelete={handleDeleteConnection}
                    onRowEdit={handleEditConnection}
                />
            </Box>
            <Box>
                <Box className={styles.inlineContainer}>
                    <InputLabel>{AVALIABLE_UPCONVERTERS}</InputLabel>
                    {!isUpconvertersLoading && !upconverters ? (
                        <CustomButton
                            className={styles.button}
                            variant='outlined'
                            onClick={handleAddUpconverter}
                        >
                            Добавить
                        </CustomButton>
                    ) : null}
                </Box>
                <DevicesGrid
                    devices={upconverters}
                    isLoading={isUpconvertersLoading}
                    label={DEVICES_EMPTY}
                    type_name={DeviceType.UPCONV}
                    onRowAdd={handleAddUpconverter}
                    onRowDelete={handleDeleteConnection}
                    onRowEdit={handleEditConnection}
                />
            </Box>
            <ConfirmModal
                content={`Вы уверены, что хотите удалить устройство ${deletingDevice.name}?`}
                isOpen={deleteConfirmationOpen}
                title={'Подтверждение удаления'}
                onClose={handleDeleteConfirmationCancel}
                onConfirm={handleDeleteConfirmation}
            />
            <DeviceFormModal
                device={currentDevice}
                deviceId={currentDeviceId}
                isOpen={newDeviceOpen}
                setDevice={setCurrentDevice}
                title={title}
                onClose={handleNewDeviceCancel}
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
