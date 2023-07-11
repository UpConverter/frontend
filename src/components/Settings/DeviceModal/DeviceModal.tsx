import {
    useCreateNewConnectionConfigsConfigIdConnectionsPostMutation,
    useGetConfigAvaliableDevicesConfigsConfigIdAvaliableDevicesGetQuery,
} from '@api/generatedApi';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { DeviceType } from '@store/entities/attempt/types/DeviceSchema';
import type { FC } from 'react';

type DeviceModalProps = {
    configId: number;
    label: string;
    type_name: DeviceType;
    isOpen: boolean;
    onClose: () => void;
};

export const DeviceModal: FC<DeviceModalProps> = ({ configId, label, type_name, isOpen, onClose }) => {
    const { data: devices } = useGetConfigAvaliableDevicesConfigsConfigIdAvaliableDevicesGetQuery({
        configId: configId,
        typeName: type_name,
    });
    const [createConnection] = useCreateNewConnectionConfigsConfigIdConnectionsPostMutation();

    let columns: GridColDef[] = [
        { field: 'serial_number', headerName: 'Серийный номер', width: 140 },
        { field: 'name', headerName: 'Имя устройства', width: 200 },
        { field: 'model_name', headerName: 'Модель', width: 130 },
    ];

    if (type_name === DeviceType.UPCONV) {
        columns = [
            ...columns,
            { field: 'state_name', headerName: 'Состояние', width: 100 },
            { field: 'additional_state_name', headerName: 'Дополнительно', width: 130 },
        ];
    }

    const handleRowClick = (params: any) => {
        if (configId) {
            createConnection({
                configId: configId,
                connectionCreate: {
                    device_id: params.row.id,
                },
            });
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
                    {devices && devices.length > 0 ? (
                        <DataGrid
                            columns={columns}
                            pageSizeOptions={[5, 10]}
                            rows={devices}
                            onRowClick={handleRowClick}
                        />
                    ) : (
                        <Typography
                            gutterBottom
                            variant='body1'
                        >
                            Все доступные устройства уже задействованы
                        </Typography>
                    )}
                </DialogContent>
            </Box>
            <DialogActions>
                <Button onClick={onClose}>Закрыть</Button>
            </DialogActions>
        </Dialog>
    );
};
