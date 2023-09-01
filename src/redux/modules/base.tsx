import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const name = "base";
interface stateType {
    header: {
        visible: boolean,
        height: number
    },
    view: { 
        [index: string]: string | number;
        step: number,  // 0: home, 1: list, 2: list2, 3: 상세, 999: 로그인
        dtype: string,
        target: string | number
    }
}

const initialState: stateType = {
    header: { visible: true, height: 0 },
    view: { step: 1, dtype: 'M', target: 0 }
};

const baseSlice = createSlice({
    name,
    initialState,
    reducers: {
        setHeaderVisible: (
            state,
            action: PayloadAction<{ visible: boolean }>
        ) => {
            state.header.visible = action.payload.visible;
        },
        setHeaderHeight: (
            state,
            action: PayloadAction<{ height: number }>
        ) => {
            state.header.height = action.payload.height;
        },
        setView: (
            state, 
            action: PayloadAction<{ name: string; value: string | number }>
        ) => {
            state.view[action.payload.name] = action.payload.value;
        } 
    },
    extraReducers: {}
});

export const { setHeaderVisible, setHeaderHeight, setView } = baseSlice.actions;
export default baseSlice;