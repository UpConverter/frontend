import { splitApi } from '@api/splitApi';
import { configureStore } from '@reduxjs/toolkit';
import { attemptReducer } from '@store/entities/attempt';
import { upconverterReducer } from '@store/entities/upconverter';

export const store = configureStore({
    reducer: {
        [splitApi.reducerPath]: splitApi.reducer,
        attempt: attemptReducer,
        upconverter: upconverterReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(splitApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
