import { apiSlice } from "../../app/api/apiSlice";

export const registerSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        registerAccount: builder.mutation ({
            query: ({username, password, email}) => ({
                url: '/customers',
                method: 'POST',
                body: {
                    name: username,
                    password,
                    email
                }
            })
        }) 
    })
})

export const {
    useRegisterAccountMutation
} = registerSlice;