import { getRouteMain, getRouteSettings } from '@app/providers/AppRouter/model/constants/routes';
import styles from '@components/Menu/Menu.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { Box, Button, Drawer, List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import type { FC, KeyboardEvent, MouseEvent } from 'react';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Menu: FC = () => {
    const [state, setState] = useState(false);
    const navigate = useNavigate();

    const toggleDrawer = useCallback(
        (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
            if (event.type === 'keydown' && (event as KeyboardEvent).key === 'Tab') {
                return;
            }
            setState(open);
        },
        []
    );
    const onSettingsClick = () => {
        navigate(getRouteSettings());
    };
    const onMainClick = () => {
        navigate(getRouteMain());
    };

    return (
        <>
            <Button onClick={toggleDrawer(true)}>
                <MenuIcon fontSize='large' />
            </Button>
            <Drawer
                anchor='left'
                open={state}
                onClose={toggleDrawer(false)}
            >
                <Box
                    className={styles.box}
                    role='presentation'
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        <ListItem
                            disablePadding
                            onClick={onSettingsClick}
                        >
                            <ListItemButton className={styles.text}>
                                <ListItemIcon>
                                    <NoteAddIcon fontSize='large' />
                                </ListItemIcon>
                                Settings tst
                            </ListItemButton>
                        </ListItem>
                        <ListItem
                            disablePadding
                            key='Report'
                            onClick={onMainClick}
                        >
                            <ListItemButton className={styles.text}>
                                <ListItemIcon>
                                    <SummarizeIcon fontSize='large' />
                                </ListItemIcon>
                                FMN tst
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};
