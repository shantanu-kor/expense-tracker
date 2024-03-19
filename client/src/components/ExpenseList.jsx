import React from 'react'
import { useSelector } from 'react-redux';

const ExpenseList = () => {
    const expenses = useSelector(state => state.expense.expenses)

    return (
        <ul>
            {expenses.map(item => (<li key={item.id}>{item.amount} {item.description} {item.category}</li>))}
        </ul>
    )
}

export default ExpenseList;