import { MenuType } from "@config/types/ItemType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const name = "menu";

const initialState: MenuType = {
    id: 0,
    category: { id:0, name:'' },
    name: '',
    engName: '',
    price: 0,
    startDate: '',
    endDate: '',
    season: '',
    pick: '',
    etc: '',
    attachFiles: [],
    temp: '',
    menuDetail: []
}

const menuSlice = createSlice({
    name,
    initialState,
    reducers: {
        initialize: (
            state,
            action: PayloadAction<{ menu: MenuType }>
        ) => {
            //조회한 내용으로 초기화한다.
            Object.assign(state, action.payload.menu);
        }
    },
    extraReducers: {}
});

export const { initialize } = menuSlice.actions;
export default menuSlice;