import { CustomButton } from '@components/UI/CustomButton';
import { CustomSelect } from '@components/UI/CustomSelect';
import { LabelLine } from '@components/UI/LabelLine';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import type { SelectChangeEvent } from '@mui/material';
import { Box } from '@mui/material';
import { configs } from '@services/CommonSettings/data';
import type { FC } from 'react';
import { useState } from 'react';

import { SettingsConfigList } from '../SettingsConfigList/SettingsConfigList';
import styles from './SettingsConfig.module.css';

export const SettingsConfig: FC = () => {
    // const configs = useGetListConfigs;
    // const cals = useGetListCals;
    const [selectedConfig, setSelectedConfig] = useState<string>(configs[0].label);

    const handleConfigChange = (event: SelectChangeEvent<string | number>) => {
        const newConfig = event.target.value as string;
        setSelectedConfig(newConfig);
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
                    data={configs}
                    size='small'
                    value={selectedConfig}
                    onChange={handleConfigChange}
                />
                <CustomButton variant='outlined'>Сохранить</CustomButton>
                <CustomButton variant='outlined'>Сохранить как</CustomButton>
                <CustomButton color='error'>
                    <DeleteOutlinedIcon />
                </CustomButton>
            </LabelLine>

            <Box className={styles.flexBox}>
                <SettingsConfigList label='Калибровочные модули' />
                <SettingsConfigList label='Модули повышения частоты' />
            </Box>
        </Box>
    );
};
