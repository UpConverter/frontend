import { CustomButton } from '@components/UI/CustomButton';
import { LabelLine } from '@components/UI/LabelLine';
import type { SelectChangeEvent } from '@mui/material';
import { Box, FormControl, MenuItem, Select } from '@mui/material';
import { Port } from '@services/CommonSettings/types';
import type { FC } from 'react';
import { useState } from 'react';

import styles from './SettingsCommon.module.css';
export const SettingsCommon: FC = () => {
    const [selectedPort, setSelectedPort] = useState<Port>(Port.COM_1);
    const [selectedSpeed, setSelectedSpeed] = useState<number>(256000);
    const [selectedLanguage, setSelectedLanguage] = useState('ru');

    const handlePortChange = (event: SelectChangeEvent<Port>) => {
        const newPort = event.target.value as Port;
        setSelectedPort(newPort);
    };

    const handleSpeedChange = (event: SelectChangeEvent<number>) => {
        const newSpeed = event.target.value as number;
        setSelectedSpeed(newSpeed);
    };

    const handleLanguageChange = (language: string) => {
        setSelectedLanguage(language);
    };

    return (
        <Box>
            <LabelLine label='Порт подключения'>
                <FormControl
                    className={styles.selectControl}
                    size='small'
                >
                    <Select
                        value={selectedPort}
                        onChange={handlePortChange}
                    >
                        <MenuItem value={Port.COM_1}>{Port.COM_1}</MenuItem>
                        <MenuItem value={Port.COM_2}>{Port.COM_2}</MenuItem>
                        <MenuItem value={Port.COM_3}>{Port.COM_3}</MenuItem>
                        <MenuItem value={Port.COM_4}>{Port.COM_4}</MenuItem>
                    </Select>
                </FormControl>
            </LabelLine>
            <LabelLine label='Скорость соединения'>
                <FormControl
                    className={styles.selectControl}
                    size='small'
                >
                    <Select
                        value={selectedSpeed}
                        onChange={handleSpeedChange}
                    >
                        <MenuItem value={256000}>256 000</MenuItem>
                        <MenuItem value={257000}>257 000</MenuItem>
                        <MenuItem value={258000}>258 000</MenuItem>
                    </Select>
                </FormControl>
            </LabelLine>
            <LabelLine label='Язык'>
                <CustomButton
                    variant={selectedLanguage === 'ru' ? 'contained' : 'outlined'}
                    onClick={() => handleLanguageChange('ru')}
                >
                    Ru
                </CustomButton>
                <CustomButton
                    variant={selectedLanguage === 'en' ? 'contained' : 'outlined'}
                    onClick={() => handleLanguageChange('en')}
                >
                    En
                </CustomButton>
            </LabelLine>
        </Box>
    );
};
