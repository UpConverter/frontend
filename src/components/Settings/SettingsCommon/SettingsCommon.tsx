import { CustomButton } from '@components/UI/CustomButton';
import { CustomSelect } from '@components/UI/CustomSelect';
import { LabelLine } from '@components/UI/LabelLine';
import type { SelectChangeEvent } from '@mui/material';
import { Box } from '@mui/material';
import { ports, speeds } from '@services/CommonSettings/data';
import type { FC } from 'react';
import { useState } from 'react';

import styles from './SettingsCommon.module.css';
export const SettingsCommon: FC = () => {
    // const ports = useGetListPorts;
    // const speeds = useGetListSpeeds;
    const [selectedPort, setSelectedPort] = useState<string>('COM_1');
    const [selectedSpeed, setSelectedSpeed] = useState<number>(256000);
    const [selectedLanguage, setSelectedLanguage] = useState('ru');

    const handlePortChange = (event: SelectChangeEvent<string | number>) => {
        const newPort = event.target.value as string;
        setSelectedPort(newPort);
    };

    const handleSpeedChange = (event: SelectChangeEvent<string | number>) => {
        const newSpeed = event.target.value as number;
        setSelectedSpeed(newSpeed);
    };

    const handleLanguageChange = (language: string) => {
        setSelectedLanguage(language);
    };

    return (
        <Box>
            <LabelLine label='Порт подключения'>
                <CustomSelect
                    className={styles.selectControl}
                    data={ports}
                    size='small'
                    value={selectedPort}
                    onChange={handlePortChange}
                />
            </LabelLine>
            <LabelLine label='Скорость соединения'>
                <CustomSelect
                    className={styles.selectControl}
                    data={speeds}
                    size='small'
                    value={selectedSpeed}
                    onChange={handleSpeedChange}
                />
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
