import { Box, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import type { Converter, ConverterMode } from '@services/Converters/types';
import type { FC } from 'react';
import { useState } from 'react';

import styles from './ConverterItem.module.css';

type ConverterItemProps = Converter;

export const ConverterItem: FC<ConverterItemProps> = (props) => {
    const { name, info, mode } = props;
    const [currentMode, setCurrentMode] = useState(mode);

    const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newMode = event.target.value as ConverterMode;
        setCurrentMode(newMode);
    };

    return (
        <Box className={styles.itemContainer}>
            <Box className={styles.name}>{name}</Box>
            <Box className={styles.info}>{info}</Box>
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
