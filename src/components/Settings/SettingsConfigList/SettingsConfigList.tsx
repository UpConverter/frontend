import { CustomButton } from '@components/UI/CustomButton';
import { CustomSelect } from '@components/UI/CustomSelect';
import { LabelLine } from '@components/UI/LabelLine';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Box } from '@mui/material';
import { cals, cals_status, channels, types } from '@services/CommonSettings/data';
import type { FC } from 'react';

import styles from './SettingsConfigList.module.css';

type ConfigListProps = {
    label?: string;
};

export const SettingsConfigList: FC<ConfigListProps> = ({ label }) => {
    // const configs = useGetListConfigs;
    // const cals = useGetListCals;
    return (
        <LabelLine
            children_direction='column'
            className={styles.header}
            label={label}
            size='small'
        >
            <Box className={styles.overflowYHidden}>
                {cals_status?.map((cal, index) => (
                    <LabelLine
                        key={index}
                        label={cal.name}
                        size='medium'
                    >
                        <CustomSelect
                            className={styles.rowTypes}
                            data={types}
                            size='small'
                            value={cal.type}
                        />
                        <CustomSelect
                            className={styles.rowCals}
                            data={cals}
                            size='small'
                            value={cal.connected_to}
                        />
                        <CustomSelect
                            className={styles.rowChannels}
                            data={channels}
                            size='small'
                            value={cal.current_chanel}
                        />
                        <CustomButton color='error'>
                            <DeleteOutlinedIcon />
                        </CustomButton>
                    </LabelLine>
                ))}
            </Box>
            <CustomButton>
                <AddCircleOutlineIcon />
            </CustomButton>
        </LabelLine>
    );
};
