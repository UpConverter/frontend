import {
    useCreateNewConnectionConfigsConfigIdConnectionsPostMutation,
    useGetConfigAvaliableDevicesConfigsConfigIdAvaliableDevicesGetQuery,
} from '@api/generatedApi';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Box } from '@mui/material';
import { attemptActions } from '@store/entities/attempt';
import type { DeviceType } from '@store/entities/attempt/types/DeviceSchema';
import { AVALIABLE_DEVICES_EMPTY } from '@store/i18n/devices';
import type { FC } from 'react';

import { DevicesGrid } from '../DevicesGrid/DevicesGrid';

type DeviceModalProps = {
    configId: number;
    label: string;
    type_name: DeviceType;
    isOpen: boolean;
    onClose: () => void;
};

export const DeviceModal: FC<DeviceModalProps> = ({ configId, label, type_name, isOpen, onClose }) => {
    const dispatch = useAppDispatch();
    const { data: devices, isLoading: isDevicesLoading } =
        useGetConfigAvaliableDevicesConfigsConfigIdAvaliableDevicesGetQuery({
            configId: configId,
            typeName: type_name,
        });
    const [createConnection] = useCreateNewConnectionConfigsConfigIdConnectionsPostMutation();

    const handleRowClick = (params: any) => {
        if (configId) {
            createConnection({
                configId: configId,
                connectionCreate: {
                    device_id: params.row.id,
                },
            });
            dispatch(attemptActions.setSuccess(false));
        }
        onClose();
    };

    return (
        <Dialog
            fullWidth={false}
            maxWidth={'md'}
            open={isOpen}
            onClose={onClose}
        >
            <Box minWidth={500}>
                <DialogTitle>{label}</DialogTitle>
                <DialogContent>
                    <DevicesGrid
                        devices={devices}
                        isLoading={isDevicesLoading}
                        label={AVALIABLE_DEVICES_EMPTY}
                        type_name={type_name}
                        onRowClick={handleRowClick}
                    />
                </DialogContent>
            </Box>
            <DialogActions>
                <Button onClick={onClose}>Закрыть</Button>
            </DialogActions>
        </Dialog>
    );
};
