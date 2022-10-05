import { apiSlice } from "~/app/api/apiSlice";

export const registerSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        registerAccount: builder.mutation ({
            query: ({username, password, email}) => ({
                url: '/register',
                method: 'POST',
                body: {
                    username,
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