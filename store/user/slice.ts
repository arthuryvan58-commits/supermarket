
import { createSlice } from "@reduxjs/toolkit";

export type userType = {
    email: string;
    name: string;
    phone: string;
    city: string;
    street: string; 

};
interface StateInterface {
    user: userType | null;
    token: string | null;
    refresh: string | null;
}
const initialState: StateInterface = {
    user: null,
    token: null,
    refresh: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            const { user, token, refresh } = action.payload;
            state.user = user;
            state.token = token;
            state.refresh = refresh;
        },
        removeUser(state) {
            state.user = null;
            state.token = null;
            state.refresh = null;
        },
    }
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;