import type { Connections } from '@api/generatedApi';
import { Box, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { ConverterMode } from '@services/Converters/types';
import type { FC } from 'react';

import styles from './ConverterItem.module.css';

type ConverterItemProps = {
    onStateUpdate: (deviceId: number, newState: string) => void;
    device: Connections;
};

export const ConverterItem: FC<ConverterItemProps> = ({ device, onStateUpdate }) => {
    const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newState = event.target.value as ConverterMode;
        onStateUpdate(device.device_id, newState);
    };

    return (
        <Box className={styles.itemContainer}>
            <Box className={styles.name}>{device.device}</Box>
            <Box
                className={styles.info}
            >{`Подключен к ${device.connected_to_device} в канал ${device.connected_to_device_channel}`}</Box>
            <Box className={styles.radioButtons}>
                <RadioGroup
                    className={styles.radioGroup}
                    value={device.state_name}
                    onChange={handleStateChange}
                >
                    {Object.entries(ConverterMode).map(([key, value]) => (
                        <FormControlLabel
                            className={styles.radioLabel}
                            key={value}
                            label={value}
                            value={key}
                            control={
                                <Radio
                                    className={styles.radioInput}
                                    color='primary'
                                />
                            }
                        />
                    ))}
                </RadioGroup>
            </Box>
        </Box>
    );
};
