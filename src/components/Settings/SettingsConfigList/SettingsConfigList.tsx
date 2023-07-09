import { type Connections, type DeviceChannel, type DeviceModel } from '@api/generatedApi';
import { CustomButton } from '@components/UI/CustomButton';
import { CustomSelect } from '@components/UI/CustomSelect';
import { LabelLine } from '@components/UI/LabelLine';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Box } from '@mui/material';
import type { FC } from 'react';

import styles from './SettingsConfigList.module.css';

type ConfigListProps = {
    label?: string;
    connections: Connections[] | undefined;
    cals: Connections[] | undefined;
    channels: DeviceChannel[] | undefined;
    models: DeviceModel[] | undefined;
};
export const SettingsConfigList: FC<ConfigListProps> = ({ label, connections, channels, cals, models }) => {
    return (
        <LabelLine
            children_direction='column'
            className={styles.flexItem}
            label={label}
            size='small'
        >
            <Box className={styles.overflowYHidden}>
                {connections?.map((connection, index) => (
                    <LabelLine
                        key={index}
                        label={connection.device_name}
                        size='medium'
                    >
                        <CustomSelect
                            className={styles.rowTypes}
                            data={models?.map((model) => ({ id: model.id, value: model.name }))}
                            size='small'
                            value={connection.model_name}
                        />
                        <CustomSelect
                            className={styles.rowCals}
                            data={cals?.map((cal) => ({ id: cal.id, value: cal.device_name }))}
                            size='small'
                            value={connection.connected_to_device}
                        />
                        <CustomSelect
                            className={styles.rowChannels}
                            data={channels?.map((channel) => ({ id: channel.id, value: channel.name }))}
                            size='small'
                            value={connection.connected_to_device_channel}
                        />
                        <CustomButton color='error'>
                            <DeleteOutlinedIcon />
                        </CustomButton>
                    </LabelLine>
                ))}
            </Box>
            <CustomButton>
                <AddCircleOutlineIcon />
            </CustomButton>
        </LabelLine>
    );
};
