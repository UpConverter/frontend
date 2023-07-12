import {
    useDeleteExistingConfigConfigsConfigIdDeleteMutation,
    useGetConfigsConfigsGetQuery,
    useUpdateExistingConfigConfigsConfigIdPutMutation,
} from '@api/generatedApi';
import { NewConfigButton } from '@components/Settings/NewConfigButton/NewConfigButton';
import { SettingsConfigDevices } from '@components/Settings/SettingsConfigDevices/SettingsConfigDevices';
import { CustomButton } from '@components/UI/CustomButton';
import { CustomSelect } from '@components/UI/CustomSelect';
import { LabelLine } from '@components/UI/LabelLine';
import { useAppDispatch } from '@hooks/useAppDispatch';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import type { SelectChangeEvent } from '@mui/material';
import { TextField } from '@mui/material';
import { Box } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import { attemptActions } from '@store/entities/attempt';
import { getAttempt } from '@store/entities/attempt';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './SettingsConfig.module.css';

export const SettingsConfig = () => {
    const { data: configs } = useGetConfigsConfigsGetQuery();
    const dispatch = useAppDispatch();
    const attempt = useSelector(getAttempt);

    const [updateConfiguration] = useUpdateExistingConfigConfigsConfigIdPutMutation();
    const [deleteConfiguration] = useDeleteExistingConfigConfigsConfigIdDeleteMutation();
    const [editingName, setEditingName] = useState(false);
    const [deletingConfig, setDeletingConfig] = useState(false);
    const [newName, setNewName] = useState('');

    const handleConfigChange = (event: SelectChangeEvent<string | number>) => {
        const newConfigName = event.target.value as string;
        const newConfiguration = configs?.find((config) => config.name === newConfigName);
        dispatch(attemptActions.setConfiguration(newConfiguration));
    };

    const handleDeleteClick = () => {
        setNewName(attempt?.configuration.name || '');
        setDeletingConfig(true);
    };

    const handleEditClick = () => {
        setNewName(attempt?.configuration.name || '');
        setEditingName(true);
    };

    const handleCancelClick = () => {
        setEditingName(false);
        setDeletingConfig(false);
    };

    const handleConfirmClick = () => {
        if (!attempt?.configuration?.id) {
            return;
        }

        if (editingName && newName && newName != attempt.configuration.name) {
            updateConfiguration({
                configId: attempt.configuration.id,
                configurationCreate: {
                    name: newName,
                },
            });
            dispatch(
                attemptActions.setConfiguration({
                    id: attempt.configuration.id,
                    name: newName,
                })
            );
        }

        if (deletingConfig) {
            deleteConfiguration({ configId: attempt.configuration.id });
            dispatch(attemptActions.setConfiguration(configs?.[0]));
        }
        setEditingName(false);
        setDeletingConfig(false);
    };

    const renderInput = deletingConfig ? (
        <TextField
            error
            className={styles.input}
            defaultValue={`Удалить "${attempt?.configuration.name}"?`}
            size='small'
            InputProps={{
                readOnly: true,
            }}
        />
    ) : editingName ? (
        <OutlinedInput
            className={styles.input}
            defaultValue={newName}
            size='small'
            onChange={(e) => setNewName(e.target.value)}
        />
    ) : (
        <CustomSelect
            className={styles.selectConfig}
            data={configs?.map((config) => ({ id: config.id, value: config.name }))}
            size='small'
            value={attempt?.configuration.name || ''}
            onChange={handleConfigChange}
        />
    );

    return (
        <Box>
            <LabelLine
                className={styles.mb}
                label='Конфигурация'
                size='small'
            >
                {renderInput}
                {editingName || deletingConfig ? (
                    <>
                        <CustomButton
                            className={styles.iconButton}
                            onClick={handleConfirmClick}
                        >
                            <CheckIcon />
                        </CustomButton>
                        <CustomButton
                            className={styles.iconButton}
                            onClick={handleCancelClick}
                        >
                            <ClearIcon />
                        </CustomButton>
                    </>
                ) : (
                    <>
                        <CustomButton
                            className={styles.iconButton}
                            onClick={handleEditClick}
                        >
                            <EditIcon />
                        </CustomButton>
                        <CustomButton
                            className={styles.iconButton}
                            color='error'
                            onClick={handleDeleteClick}
                        >
                            <DeleteOutlinedIcon />
                        </CustomButton>
                    </>
                )}
                <NewConfigButton />
            </LabelLine>
            {attempt?.configuration.id && <SettingsConfigDevices configId={attempt.configuration.id} />}
        </Box>
    );
};
