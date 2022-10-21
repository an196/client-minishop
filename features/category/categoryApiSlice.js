import {apiSlice} from '../../app/api/apiSlice';

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => '/products',
            // keepUnusedDataFor: 1,
            providesTags: (result, error, arg) => [
                { type: 'Category', id: "LIST" },
            ]
        })
    })
})

export const { useGetCategoriesQuery } = categoryApiSlice;