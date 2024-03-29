import { apiSlice } from "../../app/api/apiSlice";

export const bannerApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBanner: builder.query({
            query: () => '/banners/default',
            providesTags: (result, error, arg) => [
                { type: 'Banner', id: "LIST" },
                
            ]
        }),
    })
})

export const {
    useGetBannerQuery,
} = bannerApiSlice