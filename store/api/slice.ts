import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API_URL = process.env.NEXT_PUBLIC_API_URL + "api/";
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