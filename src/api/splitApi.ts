import { getApiUrl } from '@api/getApiUrl';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const splitApi = createApi({
    endpoints: () => ({}),
    baseQuery: fetchBaseQuery({
        baseUrl: getApiUrl(),
        prepareHeaders(headers) {
            return headers;
        },
        credentials: 'include',
    }),
});
