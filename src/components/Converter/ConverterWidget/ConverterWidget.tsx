import {
    useGetLastAttemptAttemptsLastGetQuery,
    useGetLastAttemptUpconvertersAttemptsLastUpconvertersGetQuery,
} from '@api/generatedApi';
import { Box } from '@mui/material';
import { getAttemptConfigName } from '@store/entities/attempt';
import { ERROR_SUCCESS_ATTEMPT_LOADING } from '@store/entities/attempt/constants/errors';
import { getIsModuleView } from '@store/entities/upconverter';
import { type FC } from 'react';
import { useSelector } from 'react-redux';

import { ConverterError } from '../ConverterError/ConverterError';
import { ConverterList } from '../ConverterList/ConverterList';
import { ConverterModule } from '../ConverterModule/ConverterModule';

export const ConverterWidget: FC = () => {
    const { data: lustUpconverters } = useGetLastAttemptUpconvertersAttemptsLastUpconvertersGetQuery();
    const { data: lustAttempt } = useGetLastAttemptAttemptsLastGetQuery();
    const isModuleView = useSelector(getIsModuleView);
    const configName = useSelector(getAttemptConfigName);

    if (!lustAttempt || lustAttempt.config_upconv.length === 0) {
        return <ConverterError message={ERROR_SUCCESS_ATTEMPT_LOADING} />;
    }

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
