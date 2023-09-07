import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const name = "base";
interface stateType {
    header: {
        visible: boolean,
        height: number
    },
    view: { 
        [index: string]: string | number;
        category: string,
        name: string
    }
}

const initialState: stateType = {
    header: { visible: true, height: 0 },
    view: { category: '카테고리', name: '이름' }
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
        resetView: (state) => {
            Object.assign(state.view, initialState.view);
        },
        setView: (
            state,
            action: PayloadAction<{ category: string, name: string }>
        ) => {
            Object.assign(state.view, action.payload);
        }
    },
    extraReducers: {}
});

export const { setHeaderVisible, setHeaderHeight, resetView, setView } = baseSlice.actions;
export default baseSlice;