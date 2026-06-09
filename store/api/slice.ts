import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API_URL =  "https://51.68.124.152/erp/api/";
export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: "user/login",
                method: "POST",
                body,
            }),
        }),
        signIn: builder.mutation({
            query: (body) => ({
                url: "auth/profile/",
                method: "POST",
                body,
            }),
        }),
        paidOrder: builder.mutation({
            query: (body) => ({
                url: "payment/",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useSignInMutation,
    usePaidOrderMutation
} = apiSlice;
