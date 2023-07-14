import {
    type DeviceRelatedCreate,
    useCreateNewDeviceDevicesPostMutation,
    useGetDeviceAdditionalStatesDevicesAdditionalStatesGetQuery,
    useGetDeviceModelsDevicesModelsGetQuery,
    useGetDeviceStatesDevicesStatesGetQuery,
    useUpdateExistingDeviceDevicesDeviceIdPutMutation,
} from '@api/generatedApi';
import { CustomButton } from '@components/UI/CustomButton';
import { CustomSelect } from '@components/UI/CustomSelect';
import type { SelectChangeEvent } from '@mui/material';
import {
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Snackbar,
    TextField,
    Typography,
} from '@mui/material';
import { DeviceType } from '@store/entities/attempt/types/DeviceSchema';
import type { ChangeEvent, FC } from 'react';
import { useState } from 'react';

import styles from './DeviceFormModal.module.css';

type DeviceFormModalProps = {
    title: string;
    device: DeviceRelatedCreate;
    setDevice: React.Dispatch<React.SetStateAction<DeviceRelatedCreate>>;
    isOpen: boolean;
    deviceId?: number;
    onClose: () => void;
};

export const DeviceFormModal: FC<DeviceFormModalProps> = ({ title, isOpen, onClose, deviceId, device, setDevice }) => {
    const { data: models } = useGetDeviceModelsDevicesModelsGetQuery({ skip: 0, limit: 100 });
    const { data: states } = useGetDeviceStatesDevicesStatesGetQuery({ skip: 0, limit: 100 });
    const { data: additionalStates } = useGetDeviceAdditionalStatesDevicesAdditionalStatesGetQuery({
        skip: 0,
        limit: 100,
    });

    const [message, setMessage] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);

    const handleSnackbarClose = () => {
        setShowSnackbar(false);
    };

    const [createDevice] = useCreateNewDeviceDevicesPostMutation();
    const [updateDevice] = useUpdateExistingDeviceDevicesDeviceIdPutMutation();

    const onSerialNumberChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newSerialNumber = event.target.value as string;
        setDevice({
            ...device,
            serial_number: newSerialNumber,
        });
    };

    const onNameChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newName = event.target.value as string;
        setDevice({
            ...device,
            name: newName,
        });
    };

    const onModelChange = (event: SelectChangeEvent<string | number>) => {
        const model = event.target.value as string;
        setDevice({
            ...device,
            model_name: model,
        });
    };

    const onStateChange = (event: SelectChangeEvent<string | number>) => {
        const state = event.target.value as string;
        setDevice({
            ...device,
            state_name: state,
        });
    };

    const onAdditionalStateChange = (event: SelectChangeEvent<string | number>) => {
        const additionalState = event.target.value as string;
        setDevice({
            ...device,
            additional_state_name: additionalState,
        });
    };

    const handleSubmit = () => {
        if (!device.serial_number) {
            setMessage('Укажите serial number');
            setShowSnackbar(true);

            return;
        }

        if (!device.name) {
            setMessage('Укажите имя устройства');
            setShowSnackbar(true);

            return;
        }

        if (!device.model_name) {
            setMessage('Укажите модель устройства');
            setShowSnackbar(true);

            return;
        }

        if (deviceId) {
            handleUpdateDevice(deviceId);
        } else {
            handleCreateDevice();
        }
    };

    const handleUpdateDevice = (deviceId: number) => {
        updateDevice({
            deviceId: deviceId,
            deviceRelatedCreate: device,
        })
            .unwrap()
            .then(() => {
                onClose();
            })
            .catch((error) => {
                console.error(error);
                setMessage(error.data?.detail || 'Ошибка создания устройства');
                setShowSnackbar(true);
            });
    };

    const handleCreateDevice = () => {
        createDevice({
            deviceRelatedCreate: device,
        })
            .unwrap()
            .then(() => {
                onClose();
            })
            .catch((error) => {
                console.error(error);
                setMessage(error.data?.detail || 'Ошибка создания устройства');
                setShowSnackbar(true);
            });
    };

    return (
        <Dialog
            fullWidth={false}
            maxWidth={'md'}
            open={isOpen}
            onClose={onClose}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent className={styles.lineContainer}>
                <TextField
                    className={styles.serialNumber}
                    fullWidth={true}
                    label='Серийный номер'
                    value={device.serial_number}
                    onChange={onSerialNumberChange}
                />
                <TextField
                    className={styles.name}
                    fullWidth={true}
                    label='Имя устройства'
                    value={device.name}
                    onChange={onNameChange}
                />
                {models ? (
                    <CustomSelect
                        className={styles.model}
                        data={models.map((model) => ({ id: model.id, value: model.name }))}
                        value={device.model_name}
                        onChange={onModelChange}
                    />
                ) : (
                    <Typography>Не удалось получить список моделей</Typography>
                )}
                {device.type_name === DeviceType.UPCONV && (
                    <>
                        {states && additionalStates ? (
                            <>
                                <CustomSelect
                                    className={styles.state}
                                    data={states.map((state) => ({ id: state.id, value: state.name }))}
                                    value={device.state_name}
                                    onChange={onStateChange}
                                />
                                <CustomSelect
                                    className={styles.addState}
                                    value={device.additional_state_name}
                                    data={additionalStates.map((additionalState) => ({
                                        id: additionalState.id,
                                        value: additionalState.name,
                                    }))}
                                    onChange={onAdditionalStateChange}
                                />
                            </>
                        ) : (
                            <Typography>Не удалось получить список состояний</Typography>
                        )}
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <CustomButton onClick={onClose}>Отмена</CustomButton>
                <CustomButton onClick={handleSubmit}>Подтвердить</CustomButton>
            </DialogActions>
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
        </Dialog>
    );
};
