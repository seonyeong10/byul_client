import { SyrupType } from "@config/types/ItemType";
import { ReorderType, initialState, PersonalOrderType } from "@config/types/OrderType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const name = "order";

const orderSlice = createSlice({
    name,
    initialState,
    reducers: {
        init: (
            state,
            action: PayloadAction<PersonalOrderType>
        ) => {
            Object.assign(state, action.payload);
        },
        reorder: (
            state,
            action: PayloadAction<ReorderType>
        ) => {
            Object.assign(state, action.payload);
        },
        addOption: (
            state,
            action: PayloadAction<{ name: string, value: string | number | Array<SyrupType> }>
        ) => {
            state[action.payload.name] = action.payload.value;
        }
    },
    extraReducers: {}
});

export const { init, reorder, addOption } = orderSlice.actions;
export default orderSlice;