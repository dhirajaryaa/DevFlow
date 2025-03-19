import { apiSlice } from "../apiSlice.js";

export const AuthApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (userData) => ({
                url: "/users/register",
                method: "POST",
                body: JSON.stringify(userData)
            }),
            transformResponse:(data)=>data?.data
        }),
        loginUser: builder.mutation({
            query: (userData) => ({
                url: "/users/login",
                method: "POST",
                body: JSON.stringify(userData)
            }),
            transformResponse:(data)=>data?.data
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "/users/login",
                method: "POST"
            }),
            transformResponse:(data)=>data?.data
        }),
        authUser : builder.mutation({
            query: () => ({
                url: "/users/",
                method: "GET"
            }),
            transformResponse:(data)=>data?.data
        }),

    })
});

export const {useLoginUserMutation,useRegisterUserMutation,useLogoutUserMutation,useAuthUserMutation} = AuthApi;