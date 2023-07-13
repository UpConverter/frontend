import { useCreateNewConfigConfigsPostMutation } from '@api/generatedApi';
import { CustomButton } from '@components/UI/CustomButton';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { attemptActions } from '@store/entities/attempt';
import { useState } from 'react';

import styles from './NewConfigButton.module.css';

export const NewConfigButton = () => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [configurationName, setConfigurationName] = useState('');

    const [createConfiguration] = useCreateNewConfigConfigsPostMutation();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        if (configurationName) {
            createConfiguration({ configurationCreate: { name: configurationName } })
                .unwrap()
                .then((response) => {
                    const newConfiguration = {
                        name: response.name,
                        id: response.id,
                    };
                    dispatch(attemptActions.setConfiguration(newConfiguration));
                });
        }
        handleClose();
    };

    return (
        <>
            <CustomButton
                variant='outlined'
                onClick={handleOpen}
            >
                Новая конфигурация
            </CustomButton>
            <Dialog
                fullWidth={false}
                maxWidth={'md'}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Создание новой конфигурации</DialogTitle>
                <DialogContent className={styles.centerContainer}>
                    <TextField
                        fullWidth={true}
                        label='Имя конфигурации'
                        margin='normal'
                        value={configurationName}
                        onChange={(e) => setConfigurationName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Отмена</Button>
                    <Button onClick={handleSubmit}>Создать</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
