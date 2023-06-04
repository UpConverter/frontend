import { Box } from '@mui/material';
import type { Converter } from '@services/Converters/types';
import type { FC } from 'react';

import styles from './ConverterItem.module.css';
type ConverterItemProps = Converter;
export const ConverterItem: FC<ConverterItemProps> = (props) => {
    const { name, info, mode } = props;

    return (
        <Box className={styles.converterItemContainer}>
            <Box className={styles.name}>{name}</Box>
            <Box className={styles.info}>{info}</Box>
            <Box className={styles.radioButtons}>
                <label className={styles.radioLabel}>
                    <input
                        readOnly
                        checked={mode === 'cryo'}
                        className={styles.radioInput}
                        type='radio'
                        value='cryo'
                    />
                    cryo
                </label>
                <label className={styles.radioLabel}>
                    <input
                        readOnly
                        checked={mode === 'cal'}
                        className={styles.radioInput}
                        type='radio'
                        value='cal'
                    />
                    cal
                </label>
                <label className={styles.radioLabel}>
                    <input
                        readOnly
                        checked={mode === 'off'}
                        className={styles.radioInput}
                        type='radio'
                        value='off'
                    />
                    off
                </label>
            </Box>
        </Box>
    );
};
