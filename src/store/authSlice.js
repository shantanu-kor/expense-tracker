import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {auth: false};

const authSlice = createSlice({
    name: "Authentication",
    initialState: initialAuthState,
    reducers: {
        setTrue(state) {
            state.auth = true
        },
        setfalse(state) {
            state.auth = false
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;