import { splitApi } from '@api/splitApi';
import { configureStore } from '@reduxjs/toolkit';
import { convertersApi } from '@services/Converters';
import { attemptReducer } from '@store/entities/attempt';

export const store = configureStore({
    reducer: {
        [convertersApi.reducerPath]: convertersApi.reducer,
        [splitApi.reducerPath]: splitApi.reducer,
        attempt: attemptReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(splitApi.middleware).concat(convertersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
