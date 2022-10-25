import { apiSlice } from "../../app/api/apiSlice";

export const otpApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        sendOTPtoEmail: builder.mutation({
            query: data => ({
                url: '/otpCustomer',
                method: 'POST',
                body: { ...data }
            })
        }),
        compareOTPbyEmail: builder.mutation({
            query: (data) => ({
                url: '/otpCustomer/compare',
                method: 'POST',
                body: {
                    ...data
                } 
            })
        }),
        sendOTPtoChangePassword: builder.mutation({
            query: data => ({
                url: '/otpCustomer/password',
                method: 'POST',
                body: { ...data }
            })
        }),
        compareOtpByPassword: builder.mutation({
            query: data => ({
                url: '/otpCustomer/comparePassword',
                method: 'POST',
                body: { ...data }
            })
        }),
    })
})

export const {
    useSendOTPtoEmailMutation,
    useCompareOTPbyEmailMutation,
    useSendOTPtoChangePasswordMutation,
    useCompareOtpByPasswordMutation,
    useSendAcceptToChangePasswordMutation,
} = otpApiSlice;