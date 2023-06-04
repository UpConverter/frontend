import { Box } from '@mui/material';
import type { FC } from 'react';

import { ConverterHeader } from '../ConverterHeader/ConverterHeader';
import { ConverterList } from '../ConverterList/ConverterList';

export const ConverterWidget: FC = () => {
    return (
        <Box>
            <ConverterHeader />
            <ConverterList />
        </Box>
    );
};
