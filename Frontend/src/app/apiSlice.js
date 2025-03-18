import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost/api/v1/",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({}),
});
