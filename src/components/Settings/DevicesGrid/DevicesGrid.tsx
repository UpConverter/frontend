import { type DeviceRelated } from '@api/generatedApi';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, type GridColDef, GridToolbarContainer } from '@mui/x-data-grid';
import { DeviceType } from '@store/entities/attempt/types/DeviceSchema';
import { DEVICES_EMPTY } from '@store/i18n/devices';
import { type FC } from 'react';

import styles from './DevicesGrid.module.css';

type DevicesGridProps = {
    type_name: DeviceType;
    isLoading: boolean;
    devices: DeviceRelated[] | undefined;
    label?: string;
    onRowClick?: (params: any) => void;
    onRowAdd?: () => void;
    onRowEdit?: (row: any) => () => void;
    onRowDelete?: (row: any) => () => void;
};

export const DevicesGrid: FC<DevicesGridProps> = ({
    type_name,
    isLoading,
    devices,
    label,
    onRowClick,
    onRowDelete,
    onRowAdd,
    onRowEdit,
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

    if (onRowDelete && onRowEdit) {
        columns = [
            ...columns,
            {
                field: 'actions',
                type: 'actions',
                headerName: 'Действия',
                width: 100,
                cellClassName: 'actions',
                getActions: ({ row }) => {
                    return [
                        <GridActionsCellItem
                            color='inherit'
                            icon={<EditIcon />}
                            key='edit'
                            label='Edit'
                            onClick={onRowEdit(row)}
                        />,
                        <GridActionsCellItem
                            color='inherit'
                            icon={<DeleteOutlinedIcon />}
                            key='delete'
                            label='Delete'
                            onClick={onRowDelete(row)}
                        />,
                    ];
                },
            },
        ];
    }

    function EditToolbar() {
        return (
            <GridToolbarContainer>
                <Button
                    color='primary'
                    startIcon={<AddIcon />}
                    onClick={onRowAdd}
                >
                    Добавить
                </Button>
            </GridToolbarContainer>
        );
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
                    slots={{
                        toolbar: onRowAdd ? EditToolbar : undefined,
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
