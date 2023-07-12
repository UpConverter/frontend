import { type Connections, type DeviceChannel, type DeviceModel } from '@api/generatedApi';
import { DeviceModal } from '@components/Settings/DeviceModal/DeviceModal';
import { CustomButton } from '@components/UI/CustomButton';
import { CustomSelect } from '@components/UI/CustomSelect';
import { LabelLine } from '@components/UI/LabelLine';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import type { SelectChangeEvent } from '@mui/material';
import { Box } from '@mui/material';
import { getAttemptConfigId } from '@store/entities/attempt';
import { CALS_LABEL, UPCONV_LABEL } from '@store/entities/attempt/constants/labels';
import { DeviceType } from '@store/entities/attempt/types/DeviceSchema';
import { type FC, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './ConfigConnectionsTyped.module.css';

type ConfigConnectionsTypedProps = {
    deviceType: DeviceType;
    connections: Connections[] | undefined;
    cals: Connections[] | undefined;
    channels: DeviceChannel[] | undefined;
    models: DeviceModel[] | undefined;
    onConnectionDelete: (index: number, deviceType: DeviceType) => void;
    onModelChange: (index: number, event: SelectChangeEvent<string | number>, deviceType: DeviceType) => void;
    onConnectedToChange: (index: number, event: SelectChangeEvent<string | number>, deviceType: DeviceType) => void;
    onChannelChange: (index: number, event: SelectChangeEvent<string | number>, deviceType: DeviceType) => void;
};
export const ConfigConnectionsTyped: FC<ConfigConnectionsTypedProps> = ({
    deviceType,
    connections,
    channels,
    cals,
    models,
    onConnectionDelete,
    onChannelChange,
    onConnectedToChange,
    onModelChange,
}) => {
    const configId = useSelector(getAttemptConfigId);
    const label = deviceType === DeviceType.CAL ? CALS_LABEL : UPCONV_LABEL;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <LabelLine
            children_direction='column'
            label={label}
            size='small'
        >
            <Box className={styles.overflowYHidden}>
                {connections?.map((connection, index) => (
                    <LabelLine
                        key={index}
                        label={connection.device}
                        size='medium'
                    >
                        {models && (
                            <CustomSelect
                                className={styles.columnModels}
                                data={models.map((model) => ({ id: model.id, value: model.name }))}
                                size='small'
                                value={connection.model_name}
                                onChange={(value) => onModelChange(index, value, deviceType)}
                            />
                        )}
                        {cals && (
                            <CustomSelect
                                className={styles.columnCals}
                                data={cals.map((cal) => ({ id: cal.id, value: cal.device }))}
                                size='small'
                                value={
                                    deviceType === DeviceType.UPCONV && connection.connected_to_device === 'SA'
                                        ? ''
                                        : connection.connected_to_device
                                }
                                onChange={(value) => onConnectedToChange(index, value, deviceType)}
                            />
                        )}
                        {channels && (
                            <CustomSelect
                                className={styles.columnChannels}
                                data={channels.map((channel) => ({ id: channel.id, value: channel.name }))}
                                size='small'
                                value={connection.connected_to_device_channel}
                                onChange={(value) => onChannelChange(index, value, deviceType)}
                            />
                        )}
                        <CustomButton
                            color='error'
                            onClick={() => onConnectionDelete(index, deviceType)}
                        >
                            <DeleteOutlinedIcon />
                        </CustomButton>
                    </LabelLine>
                ))}
            </Box>
            <CustomButton onClick={handleOpenModal}>
                <AddCircleOutlineIcon />
            </CustomButton>
            {configId && (
                <DeviceModal
                    configId={configId}
                    isOpen={isModalOpen}
                    label={label}
                    type_name={deviceType}
                    onClose={handleCloseModal}
                />
            )}
        </LabelLine>
    );
};
