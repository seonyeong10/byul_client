import { PaymentType } from "@config/types/PaymentType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const name = "payment";

const initialState: PaymentType = {
    order_id: -1,
    pg_token: '',
    tid: ''
}

const paymentSlice = createSlice({
    name,
    initialState,
    reducers: {
        reset: (
            state
        ) => {
            Object.assign(state, initialState);
        },
        set: (
            state,
            action: PayloadAction<{ name: string, value: string | number }>
        ) => {
            const { name, value } = action.payload;
            console.log('name >> ', name, '|| value >> ', value);
            state[action.payload.name] = action.payload.value;
        }
    }
});

export const { reset, set } = paymentSlice.actions;
export default paymentSlice;