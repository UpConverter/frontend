import { Box } from '@mui/material';
import { ConverterMode } from '@services/Converters/types';
import type { FC } from 'react';

import { ConverterItem } from '../ConverterItem/ConverterItem';
import styles from './ConverterList.module.css';
export const ConverterList: FC = () => {
    const converterItems = Array.from(Array(15), (_, index) => ({
        id: (index + 1).toString(),
        info: `Information about converter ${index + 1}`,
        mode: index % 3 === 0 ? ConverterMode.Cryo : index % 3 === 1 ? ConverterMode.Cal : ConverterMode.Off,
        name: `UpConverter #${index + 1}`,
    }));

    return (
        <Box className={styles.listContainer}>
            {converterItems.map((item) => (
                <ConverterItem
                    id={item.id}
                    info={item.info}
                    key={item.id}
                    mode={item.mode}
                    name={item.name}
                />
            ))}
        </Box>
    );
};
