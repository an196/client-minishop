import { apiSlice } from "~/app/api/apiSlice";

export const customerApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		updateCustomer: builder.mutation({
			query: (customer) => ({
				url: `/customers/${customer._id}`,
				method: 'PUT',
				body: {...customer},
			}),
		}),
	}),
});

export const { useUpdateCustomerMutation } = customerApiSlice;
