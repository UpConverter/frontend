import type { Connections } from '@api/generatedApi';
import { Box, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import type { ConverterMode } from '@services/Converters/types';
import type { FC } from 'react';
import { useState } from 'react';

import styles from './ConverterItem.module.css';

type ConverterItemProps = Connections;

export const ConverterItem: FC<ConverterItemProps> = ({
    device,
    connected_to_device,
    connected_to_device_channel,
    state_name,
}) => {
    const [currentMode, setCurrentMode] = useState(state_name);

    const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newMode = event.target.value as ConverterMode;
        setCurrentMode(newMode);
    };

    return (
        <Box className={styles.itemContainer}>
            <Box className={styles.name}>{device}</Box>
            <Box
                className={styles.info}
            >{`Подключен к ${connected_to_device} в канал ${connected_to_device_channel}`}</Box>
            <Box className={styles.radioButtons}>
                <RadioGroup
                    className={styles.radioGroup}
                    value={currentMode}
                    onChange={handleModeChange}
                >
                    <FormControlLabel
                        className={styles.radioLabel}
                        label='cryo'
                        value='cryo'
                        control={
                            <Radio
                                className={styles.radioInput}
                                color='primary'
                            />
                        }
                    />
                    <FormControlLabel
                        className={styles.radioLabel}
                        label='cal'
                        value='cal'
                        control={
                            <Radio
                                className={styles.radioInput}
                                color='primary'
                            />
                        }
                    />
                    <FormControlLabel
                        className={styles.radioLabel}
                        label='off'
                        value='off'
                        control={
                            <Radio
                                className={styles.radioInput}
                                color='primary'
                            />
                        }
                    />
                </RadioGroup>
            </Box>
        </Box>
    );
};
