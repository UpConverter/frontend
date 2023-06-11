import { Button } from '@mui/material';
import type { FC } from 'react';

import styles from './SettingsMenuItem.module.css';

type SettingsMenuItemProps = {
    label: string;
    isSelected: boolean;
    onClick: () => void;
};

export const SettingsMenuItem: FC<SettingsMenuItemProps> = ({ label, isSelected, onClick }) => {
    return (
        <Button
            className={`${styles.menuItem} ${isSelected ? styles.selected : ''}`}
            onClick={onClick}
        >
            {label}
        </Button>
    );
};
