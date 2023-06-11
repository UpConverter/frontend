import { Box } from '@mui/material';
import type { FC } from 'react';

import { SettingsMenu } from '../SettingsMenu/SettingsMenu';

export const SettingsWidget: FC = () => {
    return (
        <Box>
            <SettingsMenu />
        </Box>
    );
};
