import {
    useGetLastAttemptAttemptsLastGetQuery,
    useGetLastAttemptUpconvertersAttemptsLastUpconvertersGetQuery,
} from '@api/generatedApi';
import { Box } from '@mui/material';
import { getAttemptConfigName } from '@store/entities/attempt';
import { getIsModuleView } from '@store/entities/upconverter';
import { type FC } from 'react';
import { useSelector } from 'react-redux';

import { ConverterList } from '../ConverterList/ConverterList';
import { ConverterModule } from '../ConverterModule/ConverterModule';

export const ConverterWidget: FC = () => {
    const { data: lustUpconverters } = useGetLastAttemptUpconvertersAttemptsLastUpconvertersGetQuery();
    const { data: lustAttempt } = useGetLastAttemptAttemptsLastGetQuery();
    const isModuleView = useSelector(getIsModuleView);
    const configName = useSelector(getAttemptConfigName);

    return (
        <Box>
            {isModuleView
                ? lustUpconverters && <ConverterList lustUpconverters={lustUpconverters} />
                : lustAttempt &&
                  configName && (
                      <ConverterModule
                          attemptUpconverters={{
                              cal: configName,
                              upconverters: lustAttempt.config_upconv,
                          }}
                      />
                  )}
        </Box>
    );
};
