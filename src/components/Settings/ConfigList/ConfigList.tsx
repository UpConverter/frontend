import {
    type Configuration,
    useDeleteExistingConfigConfigsConfigIdDeleteMutation,
    useUpdateExistingConfigConfigsConfigIdPutMutation,
} from '@api/generatedApi';
import { CustomButton } from '@components/UI/CustomButton';
import { CustomSelect } from '@components/UI/CustomSelect';
import { useAppDispatch } from '@hooks/useAppDispatch';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import type { SelectChangeEvent } from '@mui/material';
import { TextField } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import { attemptActions, getAttemptConfigId, getAttemptConfigName } from '@store/entities/attempt';
import { type FC, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './ConfigList.module.css';

type ConfigListProps = {
    configs: Configuration[];
};

export const ConfigList: FC<ConfigListProps> = ({ configs }) => {
    const configName = useSelector(getAttemptConfigName);
    const configId = useSelector(getAttemptConfigId);
    const dispatch = useAppDispatch();

    const [updateConfiguration] = useUpdateExistingConfigConfigsConfigIdPutMutation();
    const [deleteConfiguration] = useDeleteExistingConfigConfigsConfigIdDeleteMutation();
    const [editingName, setEditingName] = useState(false);
    const [deletingConfig, setDeletingConfig] = useState(false);
    const [newName, setNewName] = useState('');

    const handleConfigChange = (event: SelectChangeEvent<string | number>) => {
        const newConfigName = event.target.value as string;
        const newConfiguration = configs.find((config) => config.name === newConfigName);
        dispatch(attemptActions.setConfiguration(newConfiguration));
    };

    const handleDeleteClick = () => {
        if (configName) {
            setNewName(configName);
            setDeletingConfig(true);
        }
    };

    const handleEditClick = () => {
        if (configName) {
            setNewName(configName);
            setEditingName(true);
        }
    };

    const handleCancelClick = () => {
        setEditingName(false);
        setDeletingConfig(false);
    };

    const handleConfirmClick = () => {
        if (!configId) {
            return;
        }

        if (editingName && newName && newName != configName) {
            updateConfiguration({
                configId: configId,
                configurationCreate: {
                    name: newName,
                },
            });
            dispatch(
                attemptActions.setConfiguration({
                    id: configId,
                    name: newName,
                })
            );
        }

        if (deletingConfig) {
            deleteConfiguration({ configId: configId });
            const updatedConfigs = configs.filter((config) => config.id !== configId);
            const anyOtherConfig = updatedConfigs?.[0];
            dispatch(attemptActions.setConfiguration(anyOtherConfig));
        }
        setEditingName(false);
        setDeletingConfig(false);
    };

    const renderInput = deletingConfig ? (
        <TextField
            error
            className={styles.input}
            defaultValue={`Удалить "${configName}"?`}
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
            data={configs.map((config) => ({ id: config.id, value: config.name }))}
            size='small'
            value={configName || ''}
            onChange={handleConfigChange}
        />
    );

    const renderButtons =
        editingName || deletingConfig ? (
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
        );

    return (
        <>
            {renderInput}
            {renderButtons}
        </>
    );
};
