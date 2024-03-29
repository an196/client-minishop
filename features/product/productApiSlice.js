import { apiSlice } from "../../app/api/apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query({
            query: () => '/products',
            // keepUnusedDataFor: 1,
            providesTags: (result, error, arg) => [
                { type: 'Product', id: "LIST" },
                
            ]
        }),
        getProduct: builder.query({
            query: (id) => `/products/${id}`,
            // keepUnusedDataFor: 1,
            providesTags: (result, error, arg) => [
                { type: 'Product', id: "LIST" },
                
            ]
        }),
        searchProduct: builder.query({
            query: (searchTerm) => `/products/search?p=${searchTerm}`,
            // keepUnusedDataFor: 1,
            providesTags: (result, error, arg) => [
                { type: 'Product', id: "LIST" },
                
            ]
        }),
        getProductsByCategory: builder.query({
            query: (id) => `products/category/${id}`,
            providesTags: (result, error, arg) => [
                { type: 'Product', id: "LIST" },
                
            ]
        }),
    })
})

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useSearchProductQuery,
    useGetProductsByCategoryQuery,
} = productApiSlice