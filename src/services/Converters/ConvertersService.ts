import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { ConvertersList } from './types';

export const convertersApi = createApi({
    reducerPath: 'convertersApi',
    tagTypes: ['converters'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000',
        prepareHeaders(headers) {
            return headers;
        },
        credentials: 'include',
    }),
    endpoints: (build) => ({
        getListOfConverters: build.query<ConvertersList, void>({
            query: () => `/get_converters`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'converters' as const, id })),
                          { type: 'converters', id: 'LISTCONVERTERS' },
                      ]
                    : [{ type: 'converters', id: 'LISTCONVERTERS' }],
        }),
    }),
});
export const { useGetListOfConvertersQuery } = convertersApi;
