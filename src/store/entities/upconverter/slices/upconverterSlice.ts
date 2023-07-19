import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { UpconverterState } from '@store/entities/upconverter/types/UpconverterSchema';

const initialState: UpconverterState = {
    isModuleView: false,
};

const upconverterSlice = createSlice({
    name: 'upconverter',
    initialState,
    reducers: {
        setIsModuleView: (state, action: PayloadAction<boolean>) => {
            state.isModuleView = action.payload;
        },
    },
});

export const { actions: upconverterActions, reducer: upconverterReducer } = upconverterSlice;
