import type { AttemptRelated } from '@api/generatedApi';
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
    success: false,
};

const attemptSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setAttempt: (state, action: PayloadAction<AttemptRelated | undefined>) => {
            state.configuration.id = action.payload?.configuration_id;
            state.configuration.name = action.payload?.configuration;
            state.port = action.payload?.port;
            state.speed = action.payload?.speed;
            state.success = action.payload?.success || false;
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
    },
});

export const { actions: attemptActions, reducer: attemptReducer } = attemptSlice;
