import { UserType } from "@config/types/UserType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const name = "user";

const initialState: UserType = {
    id: -1,
    name: '',
    auth: '',
    grantType: 'Bearer',
    accessToken: '',
    accessTokenExp: 0,
    refreshToken: '',
    refreshTokenExp: 0
}

const userSlice = createSlice({
    name,
    initialState,
    reducers: {
        init: (
            state,
            action: PayloadAction<UserType>
        ) => {
            Object.assign(state, action.payload);
        },
        reset: (state) => { Object.assign(state, initialState); }
    },
    extraReducers: {}
});

export const { init, reset } = userSlice.actions;
export default userSlice;