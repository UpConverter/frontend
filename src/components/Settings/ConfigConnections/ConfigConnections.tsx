import {
    useDeleteExistingConnectionConnectionsConnectionIdDeleteMutation,
    useGetConfigAvaliableDevicesConfigsConfigIdAvaliableDevicesGetQuery,
    useGetConfigConnectionsConfigsConfigIdConnectionsGetQuery,
    useGetDeviceChannelsDevicesChannelsGetQuery,
    useGetDeviceModelsDevicesModelsGetQuery,
    useUpdateExistingConnectionChannelConnectionsConnectionIdChannelPutMutation,
    useUpdateExistingConnectionConnectedToConnectionsConnectionIdConnectedToPutMutation,
    useUpdateExistingDeviceModelDevicesDeviceIdModelPutMutation,
} from '@api/generatedApi';
import { ConfigConnectionsTyped } from '@components/Settings/ConfigConnectionsTyped/ConfigConnectionsTyped';
import { ConfirmModal } from '@components/UI/ConfirmModal/ConfirmModal';
import { useAppDispatch } from '@hooks/useAppDispatch';
import type { SelectChangeEvent } from '@mui/material';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { attemptActions } from '@store/entities/attempt';
import { SA } from '@store/entities/attempt/constants/saDevice';
import { DeviceType } from '@store/entities/attempt/types/DeviceSchema';
import { type FC, useState } from 'react';

import styles from './ConfigConnections.module.css';

type ConfigConnectionsProps = {
    configId: number;
};

export const ConfigConnections: FC<ConfigConnectionsProps> = ({ configId }) => {
    const dispatch = useAppDispatch();
    const { data: channels } = useGetDeviceChannelsDevicesChannelsGetQuery({ skip: 0, limit: 100 });
    const { data: models } = useGetDeviceModelsDevicesModelsGetQuery({ skip: 0, limit: 100 });
    const {
        data: connectionsTyped,
        isLoading: isConnectionsLoading,
        refetch: refetchConnections,
    } = useGetConfigConnectionsConfigsConfigIdConnectionsGetQuery({ configId });
    const { refetch: refetchAvaliableCals } = useGetConfigAvaliableDevicesConfigsConfigIdAvaliableDevicesGetQuery({
        configId: configId,
        typeName: DeviceType.CAL,
    });
    const { refetch: refetchAvaliableUpconv } = useGetConfigAvaliableDevicesConfigsConfigIdAvaliableDevicesGetQuery({
        configId: configId,
        typeName: DeviceType.UPCONV,
    });

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [deletingConnectionIndex, setDeletingConnectionIndex] = useState(-1);
    const [deletingContent, setDeletingContent] = useState('');
    const [deletingConnectionType, setDeletingConnectionType] = useState<DeviceType>(DeviceType.CAL);

    const [updateChannel] = useUpdateExistingConnectionChannelConnectionsConnectionIdChannelPutMutation();
    const [updateConnectedTo] = useUpdateExistingConnectionConnectedToConnectionsConnectionIdConnectedToPutMutation();
    const [updateDeviceModel] = useUpdateExistingDeviceModelDevicesDeviceIdModelPutMutation();
    const [deleteConnection] = useDeleteExistingConnectionConnectionsConnectionIdDeleteMutation();

    const handleDeleteConnection = (index: number, deviceType: DeviceType) => {
        if (connectionsTyped) {
            setDeletingConnectionIndex(index);
            setDeletingConnectionType(deviceType);
            const content =
                deviceType === DeviceType.CAL
                    ? connectionsTyped?.config_cals[index].device
                    : connectionsTyped?.config_upconv[index].device;
            setDeletingContent(content);
            setDeleteConfirmationOpen(true);
        }
    };

    const handleDeleteConfirmationCancel = () => {
        setDeleteConfirmationOpen(false);
    };

    const handleDeleteConfirmation = () => {
        if (connectionsTyped) {
            const updatedConnections =
                deletingConnectionType === DeviceType.CAL
                    ? [...connectionsTyped.config_cals]
                    : [...connectionsTyped.config_upconv];
            const connection = updatedConnections[deletingConnectionIndex];

            deleteConnection({ connectionId: connection.id });
            deletingConnectionType === DeviceType.CAL ? refetchAvaliableCals() : refetchAvaliableUpconv();

            dispatch(attemptActions.setSuccess(false));
            refetchConnections();
        }
        setDeleteConfirmationOpen(false);
    };

    const handleChannelChange = (index: number, event: SelectChangeEvent<string | number>, deviceType: DeviceType) => {
        if (connectionsTyped) {
            const updatedConnections =
                deviceType === DeviceType.CAL ? [...connectionsTyped.config_cals] : [...connectionsTyped.config_upconv];
            const connection = updatedConnections[index];
            const newChannelName = event.target.value as string;

            updateChannel({
                connectionId: connection.id,
                channel: newChannelName,
            });
            dispatch(attemptActions.setSuccess(false));
            refetchConnections();
        }
    };

    const handleConnectedToChange = (
        index: number,
        event: SelectChangeEvent<string | number>,
        deviceType: DeviceType
    ) => {
        if (connectionsTyped) {
            const updatedConnections =
                deviceType === DeviceType.CAL ? [...connectionsTyped.config_cals] : [...connectionsTyped.config_upconv];
            const connection = updatedConnections[index];
            const newConnectedToName = event.target.value as string;

            updateConnectedTo({
                connectionId: connection.id,
                connectedTo: newConnectedToName,
            });

            dispatch(attemptActions.setSuccess(false));
            refetchConnections();
        }
    };

    const handleModelChange = (index: number, event: SelectChangeEvent<string | number>, deviceType: DeviceType) => {
        if (connectionsTyped) {
            const updatedConnections =
                deviceType === DeviceType.CAL ? [...connectionsTyped.config_cals] : [...connectionsTyped.config_upconv];
            const connection = updatedConnections[index];
            const newModel = event.target.value as string;

            updateDeviceModel({
                deviceId: connection.device_id,
                model: newModel,
            });
            dispatch(attemptActions.setSuccess(false));
            refetchConnections();
        }
    };

    return (
        <Box className={styles.flexBox}>
            {isConnectionsLoading || !connectionsTyped ? (
                <CircularProgress size={20} />
            ) : (
                <>
                    <ConfigConnectionsTyped
                        cals={[SA, ...connectionsTyped.config_cals]}
                        channels={channels}
                        connections={connectionsTyped.config_cals}
                        deviceType={DeviceType.CAL}
                        models={models}
                        onChannelChange={handleChannelChange}
                        onConnectedToChange={handleConnectedToChange}
                        onConnectionDelete={handleDeleteConnection}
                        onModelChange={handleModelChange}
                    />
                    <ConfigConnectionsTyped
                        cals={connectionsTyped.config_cals}
                        channels={channels}
                        connections={connectionsTyped.config_upconv}
                        deviceType={DeviceType.UPCONV}
                        models={models}
                        onChannelChange={handleChannelChange}
                        onConnectedToChange={handleConnectedToChange}
                        onConnectionDelete={handleDeleteConnection}
                        onModelChange={handleModelChange}
                    />
                    <ConfirmModal
                        content={`Вы уверены, что хотите удалить соединение ${deletingContent}?`}
                        isOpen={deleteConfirmationOpen}
                        title={'Подтверждение удаления'}
                        onClose={handleDeleteConfirmationCancel}
                        onConfirm={handleDeleteConfirmation}
                    />
                </>
            )}
        </Box>
    );
};
