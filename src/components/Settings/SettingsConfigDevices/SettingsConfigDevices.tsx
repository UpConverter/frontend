import {
    useGetConfigConnectionsConfigsConfigIdConnectionsGetQuery,
    useGetDeviceChannelsDevicesChannelsGetQuery,
    useGetDeviceModelsDevicesModelsGetQuery,
} from '@api/generatedApi';
import { SettingsConfigList } from '@components/Settings/SettingsConfigList/SettingsConfigList';
import { Box } from '@mui/material';
import type { FC } from 'react';

import styles from './SettingsConfigDevices.module.css';

type ConfigDevicesProps = {
    configId: number;
};

export const SettingsConfigDevices: FC<ConfigDevicesProps> = ({ configId }) => {
    const { data: connectionsTyped } = useGetConfigConnectionsConfigsConfigIdConnectionsGetQuery({ configId });

    const { data: channels } = useGetDeviceChannelsDevicesChannelsGetQuery({ skip: 0, limit: 100 });
    const { data: models } = useGetDeviceModelsDevicesModelsGetQuery({ skip: 0, limit: 100 });

    return (
        <Box className={styles.flexBox}>
            <SettingsConfigList
                cals={connectionsTyped?.config_cals}
                channels={channels}
                connections={connectionsTyped?.config_cals}
                label='Калибровочные модули'
                models={models}
            />
            <SettingsConfigList
                cals={connectionsTyped?.config_cals}
                channels={channels}
                connections={connectionsTyped?.config_upconv}
                label='Модули повышения частоты'
                models={models}
            />
        </Box>
    );
};
