import { type DeviceRelated } from '@api/generatedApi';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { DeviceType } from '@store/entities/attempt/types/DeviceSchema';
import { DEVICES_EMPTY } from '@store/i18n/devices';
import type { FC } from 'react';

import styles from './DevicesGrid.module.css';

type DevicesGridProps = {
    type_name: DeviceType;
    isLoading: boolean;
    devices: DeviceRelated[] | undefined;
    label?: string;
    onRowClick?: (params: any) => void;
    onRowDelete?: (params: any) => void;
};

export const DevicesGrid: FC<DevicesGridProps> = ({
    type_name,
    isLoading,
    devices,
    label,
    onRowClick,
    onRowDelete,
}) => {
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

    if (onRowDelete) {
        columns.push({
            field: 'delete',
            headerName: 'Удалить',
            width: 100,
            renderCell: (params) => (
                <IconButton onClick={() => onRowDelete(params)}>
                    <DeleteOutlinedIcon />
                </IconButton>
            ),
        });
    }

    return (
        <Box className={styles.centerContainer}>
            {isLoading ? (
                <CircularProgress size={20} />
            ) : devices && devices.length > 0 ? (
                <DataGrid
                    columns={columns}
                    editMode='row'
                    pageSizeOptions={[5, 10]}
                    rows={devices}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    onRowClick={onRowClick}
                />
            ) : (
                <Typography
                    gutterBottom
                    variant='body1'
                >
                    {label ? label : DEVICES_EMPTY}
                </Typography>
            )}
        </Box>
    );
};
