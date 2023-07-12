import {
    useDeleteExistingConnectionConnectionsConnectionsConnectionIdDeleteMutation,
    useGetConfigAvaliableDevicesConfigsConfigIdAvaliableDevicesGetQuery,
    useGetConfigConnectionsConfigsConfigIdConnectionsGetQuery,
    useGetDeviceChannelsDevicesChannelsGetQuery,
    useGetDeviceModelsDevicesModelsGetQuery,
    useUpdateExistingConnectionConnectionsConnectionsConnectionIdPutMutation,
} from '@api/generatedApi';
import { SettingsConfigList } from '@components/Settings/SettingsConfigList/SettingsConfigList';
import { ConfirmModal } from '@components/UI/ConfirmModal/ConfirmModal';
import { useAppDispatch } from '@hooks/useAppDispatch';
import type { SelectChangeEvent } from '@mui/material';
import { Box } from '@mui/material';
import { attemptActions } from '@store/entities/attempt';
import { getAttemptCals, getAttemptUpconv } from '@store/entities/attempt';
import { SA } from '@store/entities/attempt/constants/saDevice';
import { connectionActions, DeviceType } from '@store/entities/attempt/types/DeviceSchema';
import { type FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './SettingsConfigDevices.module.css';

type ConfigDevicesProps = {
    configId: number;
};

export const SettingsConfigDevices: FC<ConfigDevicesProps> = ({ configId }) => {
    const { data: channels } = useGetDeviceChannelsDevicesChannelsGetQuery({ skip: 0, limit: 100 });
    const { data: models } = useGetDeviceModelsDevicesModelsGetQuery({ skip: 0, limit: 100 });
    const { data: connectionsTyped } = useGetConfigConnectionsConfigsConfigIdConnectionsGetQuery({ configId });
    const { refetch: refetchAvaliableCals } = useGetConfigAvaliableDevicesConfigsConfigIdAvaliableDevicesGetQuery({
        configId: configId,
        typeName: DeviceType.CAL,
    });
    const { refetch: refetchAvaliableUpconv } = useGetConfigAvaliableDevicesConfigsConfigIdAvaliableDevicesGetQuery({
        configId: configId,
        typeName: DeviceType.UPCONV,
    });

    const dispatch = useAppDispatch();
    const configCals = useSelector(getAttemptCals);
    const configUpconv = useSelector(getAttemptUpconv);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [deletingConnectionIndex, setDeletingConnectionIndex] = useState(-1);
    const [deletingConnectionType, setDeletingConnectionType] = useState<DeviceType>(DeviceType.CAL);

    useEffect(() => {
        if (connectionsTyped) {
            dispatch(attemptActions.setCals(connectionsTyped.config_cals));
            dispatch(attemptActions.setUpconv(connectionsTyped.config_upconv));
        }
    }, [dispatch, connectionsTyped]);

    const [updateConnection] = useUpdateExistingConnectionConnectionsConnectionsConnectionIdPutMutation();
    const [deleteConnection] = useDeleteExistingConnectionConnectionsConnectionsConnectionIdDeleteMutation();

    const handleDeleteConnection = (index: number, deviceType: DeviceType) => {
        setDeletingConnectionIndex(index);
        setDeletingConnectionType(deviceType);
        setDeleteConfirmationOpen(true);
    };

    const handleDeleteConfirmationCancel = () => {
        setDeleteConfirmationOpen(false);
    };

    const handleDeleteConfirmation = () => {
        const updatedConnections = deletingConnectionType === DeviceType.CAL ? [...configCals] : [...configUpconv];
        const connection = updatedConnections[deletingConnectionIndex];

        deleteConnection({ connectionId: connection.id });
        deletingConnectionType === DeviceType.CAL ? refetchAvaliableCals() : refetchAvaliableUpconv();

        const filteredConnections = updatedConnections.filter((conn, i) => i !== deletingConnectionIndex);

        const action = connectionActions[deletingConnectionType];
        dispatch(action(filteredConnections));
        dispatch(attemptActions.setSuccess(false));

        setDeleteConfirmationOpen(false);
    };

    const handleChannelChange = (index: number, event: SelectChangeEvent<string | number>, deviceType: DeviceType) => {
        const updatedConnections = deviceType === DeviceType.CAL ? [...configCals] : [...configUpconv];
        const connection = updatedConnections[index];
        const newChannelName = event.target.value as string;

        const updatedConnection = {
            ...connection,
            connected_to_device_channel: newChannelName,
        };

        updateConnection({
            connectionId: connection.id,
            connectionRelatedCreate: {
                device: connection.device,
                connected_to_device: connection.connected_to_device,
                connected_to_device_channel: newChannelName,
            },
        });
        updatedConnections[index] = updatedConnection;

        const action = connectionActions[deviceType];
        dispatch(action(updatedConnections));
        dispatch(attemptActions.setSuccess(false));
    };

    return (
        <Box className={styles.flexBox}>
            <SettingsConfigList
                cals={[SA, ...configCals]}
                channels={channels}
                connections={configCals}
                deviceType={DeviceType.CAL}
                models={models}
                onChannelChange={handleChannelChange}
                onConnectionDelete={handleDeleteConnection}
            />
            <SettingsConfigList
                cals={[SA, ...configCals]}
                channels={channels}
                connections={configUpconv}
                deviceType={DeviceType.UPCONV}
                models={models}
                onChannelChange={handleChannelChange}
                onConnectionDelete={handleDeleteConnection}
            />
            <ConfirmModal
                content={'Вы уверены, что хотите удалить соединение?'}
                isOpen={deleteConfirmationOpen}
                title={'Подтверждение удаления'}
                onClose={handleDeleteConfirmationCancel}
                onConfirm={handleDeleteConfirmation}
            />
        </Box>
    );
};
