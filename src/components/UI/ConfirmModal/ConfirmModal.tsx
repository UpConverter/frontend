import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import type { FC } from 'react';

type ConfirmModalProps = {
    isOpen: boolean;
    title: string;
    content?: string;
    onClose: () => void;
    onConfirm: () => void;
};

export const ConfirmModal: FC<ConfirmModalProps> = ({ isOpen, title, content, onClose, onConfirm }) => {
    return (
        <Dialog
            fullWidth={false}
            maxWidth={'md'}
            open={isOpen}
            onClose={onClose}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{content}</DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button onClick={onConfirm}>Подтвердить</Button>
            </DialogActions>
        </Dialog>
    );
};
