import { apiSlice } from "~/app/api/apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query({
            query: () => '/products',
            // keepUnusedDataFor: 1,
            providesTags: (result, error, arg) => [
                { type: 'Product', id: "LIST" },
                
            ]
        }),
    })
})

export const {
    useGetProductsQuery,
} = productApiSlice