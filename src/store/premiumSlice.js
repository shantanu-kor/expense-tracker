import { createSlice } from "@reduxjs/toolkit"

const initialPremiumState = {premium: false}

const premiumSlice = createSlice({
    name: "Premium",
    initialState: initialPremiumState,
    reducers: {
        setTrue(state) {
            state.premium = true
        },
        setFalse(state) {
            state.premium = false
        }
    }
})

export const premiumActions = premiumSlice.actions;

export default premiumSlice.reducer;