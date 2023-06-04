import { Box } from '@mui/material';
import type { FC } from 'react';

import { ConverterItem } from '../ConverterItem/ConverterItem';

export const ConverterList: FC = () => {
    return (
        <Box>
            Converter List
            <ConverterItem
                id='1'
                info='Information about converter'
                mode='cal'
                name='UpConverter'
            />
        </Box>
    );
};
