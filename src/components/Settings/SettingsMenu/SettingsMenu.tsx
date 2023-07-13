import { useCreateNewAttemptAttemptsPostMutation } from '@api/generatedApi';
import { SettingsCommon } from '@components/Settings/SettingsCommon/SettingsCommon';
import { SettingsConfig } from '@components/Settings/SettingsConfig/SettingsConfig';
import { SettingsDevices } from '@components/Settings/SettingsDevices/SettingsDevices';
import { SettingsMenuItem } from '@components/Settings/SettingsMenuItem/SettingsMenuItem';
import { Alert } from '@components/UI/Alert';
import { CustomButton } from '@components/UI/CustomButton';
import { Box, CircularProgress, Divider, Snackbar } from '@mui/material';
import { getAttemptConfigId, getAttemptPort, getAttemptSpeed, getAttemptSuccess } from '@store/entities/attempt';
import { ERROR_CREATE_ATTEMPT, SUCCESS_CREATE_ATTEMPT } from '@store/entities/attempt/constants/errors';
import { MenuItems } from '@store/entities/attempt/constants/labels';
import type { FC } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './SettingsMenu.module.css';

export const SettingsMenu: FC = () => {
    const configuration_id = useSelector(getAttemptConfigId);
    const speed = useSelector(getAttemptSpeed);
    const port = useSelector(getAttemptPort);
    const success = useSelector(getAttemptSuccess);
    const [createNewAttempt, { isLoading }] = useCreateNewAttemptAttemptsPostMutation();
    const [selectedType, setSelectedType] = useState<MenuItems>(() => {
        const storedType = localStorage.getItem('selectedType');

        return storedType ? JSON.parse(storedType) : MenuItems.CUMMON;
    });
    const [message, setMessage] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);

    const handleApplyClick = () => {
        if (!speed || !port) {
            setMessage('Пожалуйста, укажите порт и скорость соединения');
            setShowSnackbar(true);

            return;
        }
        if (!configuration_id) {
            setMessage('Конфигурация не была выбрана');
            setShowSnackbar(true);

            return;
        }

        createNewAttempt({
            attemptRelatedCreate: {
                configuration_id: configuration_id,
                speed: speed,
                port: port,
            },
        })
            .unwrap()
            .then((response) => {
                const { success } = response;
                setMessage(success ? SUCCESS_CREATE_ATTEMPT : ERROR_CREATE_ATTEMPT);
                setShowSnackbar(true);
            })
            .catch((error) => {
                setMessage(ERROR_CREATE_ATTEMPT);
                setShowSnackbar(true);
                console.error(error);
            });
    };

    const handleTypeChange = (type: MenuItems) => {
        setSelectedType(type);
        localStorage.setItem('selectedType', JSON.stringify(type));
    };

    const handleSnackbarClose = () => {
        setShowSnackbar(false);
    };

    const renderSettingsComponent = () => {
        switch (selectedType) {
            case MenuItems.CUMMON:
                return <SettingsCommon />;
            case MenuItems.CONFIG:
                return <SettingsConfig />;
            case MenuItems.DEVICES:
                return <SettingsDevices />;
            default:
                return null;
        }
    };

    return (
        <Box className={styles.flex}>
            <Box className={styles.leftSide}>
                <Box className={styles.menuItems}>
                    {Object.values(MenuItems).map((item) => (
                        <SettingsMenuItem
                            isSelected={selectedType === item}
                            key={item}
                            label={item}
                            onClick={() => handleTypeChange(item)}
                        />
                    ))}
                </Box>
                <CustomButton
                    disabled={isLoading}
                    variant='outlined'
                    onClick={handleApplyClick}
                >
                    {isLoading ? <CircularProgress size={20} /> : 'Применить'}
                </CustomButton>
            </Box>
            <Divider
                flexItem
                className={styles.divider}
                orientation='vertical'
            />
            <Box className={styles.rightSide}>{renderSettingsComponent()}</Box>

            <Snackbar
                autoHideDuration={3000}
                open={showSnackbar}
                onClose={handleSnackbarClose}
            >
                <Alert
                    severity={success ? 'success' : 'error'}
                    onClose={handleSnackbarClose}
                >
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    );
};
