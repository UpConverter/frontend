import { splitApi } from '@api/splitApi';
import { configureStore } from '@reduxjs/toolkit';
import { convertersApi } from '@services/Converters';

export const store = configureStore({
    reducer: {
        [convertersApi.reducerPath]: convertersApi.reducer,
        [splitApi.reducerPath]: splitApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(splitApi.middleware).concat(convertersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
