import { useGetPortsPortsGetQuery, useGetSpeedsSpeedsGetQuery } from '@api/generatedApi';
import { CustomButton } from '@components/UI/CustomButton';
import { CustomSelect } from '@components/UI/CustomSelect';
import { LabelLine } from '@components/UI/LabelLine';
import { useAppDispatch } from '@hooks/useAppDispatch';
import type { SelectChangeEvent } from '@mui/material';
import { Box } from '@mui/material';
import { attemptActions } from '@store/entities/attempt';
import { getAttempt } from '@store/entities/attempt';
import type { FC } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './SettingsCommon.module.css';
export const SettingsCommon: FC = () => {
    const { data: ports } = useGetPortsPortsGetQuery({ skip: 0, limit: 100 });
    const { data: speeds } = useGetSpeedsSpeedsGetQuery({ skip: 0, limit: 100 });
    const dispatch = useAppDispatch();
    const attempt = useSelector(getAttempt);

    const [selectedLanguage, setSelectedLanguage] = useState('ru');

    const handlePortChange = (event: SelectChangeEvent<string | number>) => {
        const newPort = event.target.value as string;
        dispatch(attemptActions.setPort(newPort));
    };

    const handleSpeedChange = (event: SelectChangeEvent<string | number>) => {
        const newSpeed = event.target.value as number;
        dispatch(attemptActions.setSpeed(newSpeed));
    };

    const handleLanguageChange = (language: string) => {
        setSelectedLanguage(language);
    };

    return (
        <Box>
            <LabelLine label='Порт подключения'>
                {ports && (
                    <CustomSelect
                        className={styles.selectControl}
                        data={ports.map((port) => ({ id: port.id, value: port.name }))}
                        size='small'
                        value={attempt.port}
                        onChange={handlePortChange}
                    />
                )}
            </LabelLine>
            <LabelLine label='Скорость соединения'>
                {speeds && (
                    <CustomSelect
                        className={styles.selectControl}
                        data={speeds}
                        size='small'
                        value={attempt.speed}
                        onChange={handleSpeedChange}
                    />
                )}
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
