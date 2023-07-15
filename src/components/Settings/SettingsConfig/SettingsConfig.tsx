import { useGetConfigsConfigsGetQuery } from '@api/generatedApi';
import { ConfigConnections } from '@components/Settings/ConfigConnections/ConfigConnections';
import { NewConfigButton } from '@components/Settings/NewConfigButton/NewConfigButton';
import { LabelLine } from '@components/UI/LabelLine';
import { Box } from '@mui/material';
import { getAttemptConfigId } from '@store/entities/attempt';
import { useSelector } from 'react-redux';

import { ConfigList } from '../ConfigList/ConfigList';
import styles from './SettingsConfig.module.css';

export const SettingsConfig = () => {
    const { data: configs } = useGetConfigsConfigsGetQuery();
    const configId = useSelector(getAttemptConfigId);

    return (
        <Box>
            <LabelLine
                className={styles.mb}
                label='Конфигурация'
                size='small'
            >
                {configs && configs.length > 0 ? <ConfigList configs={configs} /> : null}
                <NewConfigButton />
            </LabelLine>
            {configId && <ConfigConnections configId={configId} />}
        </Box>
    );
};
