import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { expenseActions } from '../store/expenseSlice';

const ExpenseList = () => {
    const expenses = useSelector(state => state.expense.expenses)

    const dispatch = useDispatch();

    const deleteHandler = async (id) => {
        let data = await fetch(`${import.meta.env.VITE_BE_URL}/expense/delete-expense/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        data = await data.json();
        dispatch(expenseActions.removeExpense(id));
    };

    return (
        <table className="mx-auto my-4 md:text-2xl text-1xl text-center border-collapse table-fixed">
            <thead>
                <tr>
                    <th className="border-black border">Date</th>
                    <th className="border-black border">Amount</th>
                    <th className="border-black border">Description</th>
                    <th className="border-black border">Category</th>
                </tr>
            </thead>
            {expenses.map(item => (<tbody>
                <tr>
                    <td className="border-black border">{item.date}</td>
                    <td className="border-black border">{item.amount}</td>
                    <td className="border-black border">{item.description}</td>
                    <td className="border-black border">{item.category}</td>
                    <td><button className="border-2 p-1 border-blue-500 rounded-lg hover:bg-blue-600 bg-white" onClick={(event) => {
                        event.preventDefault();
                        deleteHandler(item.id);
                    }}>Delete</button></td>
                </tr>
            </tbody>))}
        </table>
    )
}

export default ExpenseList;