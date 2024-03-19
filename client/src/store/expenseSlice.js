import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {expenses: []};

const expenseSlice = createSlice({
    name: "Expenses",
    initialState: initialExpenseState,
    reducers: {
        addExpense(state, action) {
            state.expenses = [...state.expenses, action.payload]
        }
    }
})

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;