import { Box, Button, Divider } from '@mui/material';
import type { FC } from 'react';
import { useState } from 'react';

import { SettingsCommon } from '../SettingsCommon/SettingsCommon';
import { SettingsConfig } from '../SettingsConfig/SettingsConfig';
import { SettingsMenuItem } from '../SettingsMenuItem/SettingsMenuItem';
import styles from './SettingsMenu.module.css';

export const SettingsMenu: FC = () => {
    const [selectedType, setSelectedType] = useState('common');
    const menuItems = [
        { id: 'common', label: 'Общие' },
        { id: 'config', label: 'Конфигурация системы' },
    ];

    const handleTypeChange = (type: string) => {
        setSelectedType(type);
    };

    const renderSettingsComponent = () => {
        switch (selectedType) {
            case 'common':
                return <SettingsCommon />;
            case 'config':
                return <SettingsConfig />;
            default:
                return null;
        }
    };

    return (
        <Box className={styles.flex}>
            <Box className={styles.leftSide}>
                <Box className={styles.menuItems}>
                    {menuItems.map((item) => (
                        <SettingsMenuItem
                            isSelected={selectedType === item.id}
                            key={item.id}
                            label={item.label}
                            onClick={() => handleTypeChange(item.id)}
                        />
                    ))}
                </Box>
                <Button
                    className={styles.submitButton}
                    variant='outlined'
                >
                    Применить
                </Button>
            </Box>
            <Divider
                flexItem
                className={styles.divider}
                orientation='vertical'
            />
            <Box className={styles.rightSide}>{renderSettingsComponent()}</Box>
        </Box>
    );
};
