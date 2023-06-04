import { configureStore } from '@reduxjs/toolkit';
import { convertersApi } from '@services/Converters';

export const store = configureStore({
    reducer: {
        [convertersApi.reducerPath]: convertersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(convertersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
