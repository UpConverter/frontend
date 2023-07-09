import { useGetConfigsConfigsGetQuery } from '@api/generatedApi';
import { SettingsConfigDevices } from '@components/Settings/SettingsConfigDevices/SettingsConfigDevices';
import { CustomButton } from '@components/UI/CustomButton';
import { CustomSelect } from '@components/UI/CustomSelect';
import { LabelLine } from '@components/UI/LabelLine';
import { useAppDispatch } from '@hooks/useAppDispatch';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import type { SelectChangeEvent } from '@mui/material';
import { Box } from '@mui/material';
import { attemptActions } from '@store/entities/attempt';
import { getAttempt } from '@store/entities/attempt';
import type { FC } from 'react';
import { useSelector } from 'react-redux';

import styles from './SettingsConfig.module.css';

export const SettingsConfig: FC = () => {
    const { data: configs } = useGetConfigsConfigsGetQuery();
    const dispatch = useAppDispatch();
    const attempt = useSelector(getAttempt);

    const handleConfigChange = (event: SelectChangeEvent<string | number>) => {
        const newConfigName = event.target.value as string;
        const newConfiguration = configs?.find((config) => config.name === newConfigName);
        dispatch(attemptActions.setConfiguration(newConfiguration));
    };

    return (
        <Box>
            <LabelLine
                className={styles.mb}
                label='Конфигурация'
                size='small'
            >
                <CustomSelect
                    className={styles.selectConfig}
                    data={configs?.map((config) => ({ id: config.id, value: config.name }))}
                    size='small'
                    value={attempt?.configuration.name || ''}
                    onChange={handleConfigChange}
                />
                <CustomButton variant='outlined'>Сохранить</CustomButton>
                <CustomButton variant='outlined'>Сохранить как</CustomButton>
                <CustomButton color='error'>
                    <DeleteOutlinedIcon />
                </CustomButton>
            </LabelLine>
            {attempt?.configuration.id && <SettingsConfigDevices configId={attempt.configuration.id} />}
        </Box>
    );
};
