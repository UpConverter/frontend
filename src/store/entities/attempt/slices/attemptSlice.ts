import type { AttemptConnections } from '@api/generatedApi';
import type { Connections } from '@api/generatedApi';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { AttemptState, Configuration } from '@store/entities/attempt/types/AttemptSchema';

const initialState: AttemptState = {
    cals: [],
    upconv: [],
    configuration: {
        id: undefined,
        name: undefined,
    },
    port: undefined,
    speed: undefined,
    success: false,
};

const attemptSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setAttempt: (state, action: PayloadAction<AttemptConnections | undefined>) => {
            state.cals = action.payload?.config_cals || [];
            state.upconv = action.payload?.config_upconv || [];
            state.configuration.id = action.payload?.attempt.configuration_id;
            state.configuration.name = action.payload?.attempt.configuration;
            state.port = action.payload?.attempt.port;
            state.speed = action.payload?.attempt.speed;
            state.success = action.payload?.attempt.success || false;
        },
        setConfiguration: (state, action: PayloadAction<Configuration | undefined>) => {
            state.configuration.id = action.payload?.id;
            state.configuration.name = action.payload?.name;
            state.success = false;
        },
        setPort: (state, action: PayloadAction<string>) => {
            state.port = action.payload;
            state.success = false;
        },
        setSpeed: (state, action: PayloadAction<number>) => {
            state.speed = action.payload;
            state.success = false;
        },
        setSuccess: (state, action: PayloadAction<boolean>) => {
            state.success = action.payload;
        },
        setUpconv: (state, action: PayloadAction<Connections[]>) => {
            state.upconv = action.payload;
        },
        setCals: (state, action: PayloadAction<Connections[]>) => {
            state.cals = action.payload;
        },
    },
});

export const { actions: attemptActions, reducer: attemptReducer } = attemptSlice;
