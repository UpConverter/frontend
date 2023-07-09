import { useCreateNewAttemptAttemptsPostMutation } from '@api/generatedApi';
import { Alert } from '@components/UI/Alert';
import { CustomButton } from '@components/UI/CustomButton';
import { Box, CircularProgress, Divider, Snackbar } from '@mui/material';
import { getAttemptConfigId, getAttemptPort, getAttemptSpeed, getAttemptSuccess } from '@store/entities/attempt';
import type { FC } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { SettingsCommon } from '../SettingsCommon/SettingsCommon';
import { SettingsConfig } from '../SettingsConfig/SettingsConfig';
import { SettingsMenuItem } from '../SettingsMenuItem/SettingsMenuItem';
import { ERROR_CREATE_ATTEMPT, menuItems, SUCCESS_CREATE_ATTEMPT } from './consts';
import styles from './SettingsMenu.module.css';

export const SettingsMenu: FC = () => {
    const configuration_id = useSelector(getAttemptConfigId);
    const speed = useSelector(getAttemptSpeed);
    const port = useSelector(getAttemptPort);
    const success = useSelector(getAttemptSuccess);
    const [createNewAttempt, { isLoading }] = useCreateNewAttemptAttemptsPostMutation();
    const [selectedType, setSelectedType] = useState('common');
    const [showSnackbar, setShowSnackbar] = useState(false);

    const handleApplyClick = () => {
        if (!configuration_id || !speed || !port) {
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
            .then(() => {
                setShowSnackbar(true);
            });
    };

    const handleTypeChange = (type: string) => {
        setSelectedType(type);
    };

    const handleSnackbarClose = () => {
        setShowSnackbar(false);
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
                    {success ? SUCCESS_CREATE_ATTEMPT : ERROR_CREATE_ATTEMPT}
                </Alert>
            </Snackbar>
        </Box>
    );
};
