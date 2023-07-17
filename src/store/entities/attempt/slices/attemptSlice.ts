import type { AttemptConnections } from '@api/generatedApi';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { AttemptState, Configuration } from '@store/entities/attempt/types/AttemptSchema';

const initialState: AttemptState = {
    configuration: {
        id: undefined,
        name: undefined,
    },
    port: undefined,
    speed: undefined,
    attempt_token: undefined,
};

const attemptSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setAttempt: (state, action: PayloadAction<AttemptConnections | undefined>) => {
            if (action.payload) {
                state.configuration.id = action.payload.attempt.configuration_id;
                state.configuration.name = action.payload.attempt.configuration;
                state.port = action.payload.attempt.port;
                state.speed = action.payload.attempt.speed;
                state.attempt_token = action.payload.attempt_token;
            }
        },
        setConfiguration: (state, action: PayloadAction<Configuration | undefined>) => {
            state.configuration.id = action.payload?.id;
            state.configuration.name = action.payload?.name;
            state.attempt_token = undefined;
        },
        setPort: (state, action: PayloadAction<string>) => {
            state.port = action.payload;
            state.attempt_token = undefined;
        },
        setSpeed: (state, action: PayloadAction<number>) => {
            state.speed = action.payload;
            state.attempt_token = undefined;
        },
        setAttemptToken: (state, action: PayloadAction<string | undefined>) => {
            state.attempt_token = action.payload;
        },
    },
});

export const { actions: attemptActions, reducer: attemptReducer } = attemptSlice;
