import { apiSlice } from '~/app/api/apiSlice';

export const orderApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		postOrder: builder.mutation({
			query: (order) => ({
				url: '/orders',
				method: 'POST',
				body:  order ,
			}),
		}),
	}),
});

export const { usePostOrderMutation } = orderApiSlice;
