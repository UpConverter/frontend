import { getRouteMain, getRouteSettings } from '@app/providers/AppRouter/model/constants/routes';
import Logo from '@assets/icons/sticker.webp';
import { Settings } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Menu.module.css';
export const Menu: FC = () => {
    const navigate = useNavigate();

    const onSettingsClick = () => {
        navigate(getRouteSettings());
    };

    const onMainClick = () => {
        navigate(getRouteMain());
    };

    return (
        <Box className={styles.rowContainer}>
            <IconButton onClick={onSettingsClick}>
                <Settings className={styles.settingsIcon} />
            </IconButton>
            <IconButton
                className={styles.logo}
                onClick={onMainClick}
            >
                <img
                    alt='FMN Logo'
                    className={styles.logoImage}
                    src={Logo}
                />
            </IconButton>
        </Box>
    );
};
