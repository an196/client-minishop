import { createSlice } from '@reduxjs/toolkit';

const otpSlice = createSlice({
    name: 'otp',
    initialState: { email: null, phone: null, action: null },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPhone: (state, action) => {
            state.phone = action.payload;
        },
        setAction:  (state, action) => {
            state.action = action.payload;
        },
    },
});

export const { setEmail, setPhone, setAction } = otpSlice.actions;

export default otpSlice.reducer;

export const selectCurrentEmail = (state) => state.otp.email;
export const selectCurrentPhone = (state) => state.otp.phone;
export const selectCurrentAction = (state) => state.otp.action;