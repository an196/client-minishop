import { apiSlice } from "../../app/api/apiSlice";

export const customerApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCustomer: builder.query({
			query: (_id) => `/customers/${_id}`,
			providesTags: (result, error, arg) => [
				{ type: 'Customer' },
			]
		}),
		updateCustomer: builder.mutation({
			query: (customer) => ({
				url: `/customers/${customer._id}`,
				method: 'PUT',
				body: { ...customer },

			}),
			invalidatesTags: (result, error, arg) => [
				{ type: 'Customer', id: arg.id }
			]
		}),
	}),
});

export const { useUpdateCustomerMutation, useGetCustomerQuery } = customerApiSlice;
