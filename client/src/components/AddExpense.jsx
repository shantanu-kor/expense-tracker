import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { expenseActions } from '../store/expenseSlice';

const AddExpense = () => {
    const amountRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();

    const dispatch = useDispatch();

    const submitHandler = async (event) => {
        event.preventDefault();
        const amount = amountRef.current.value;
        const description = descriptionRef.current.value;
        const category = categoryRef.current.value;
        let data = await fetch('http://localhost:3000/expense/add-expense', {
            method: "POST",
            body: JSON.stringify({ amount, description, category }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        data = await data.json();
        if (data.success) {
            dispatch(expenseActions.addExpense(data.data));
        } else {
            alert(data.message);
        }
    };

    return (
        <form className="md:text-2xl text-1xl text-center border border-violet-800 rounded-lg md:mx-[30%] mx-[10%] p-4 bg-violet-500" onSubmit={submitHandler}>
            <div>
                <label htmlFor="amount">Amount:</label>
                <input type="number" step="0.01" id="amount" className="border border-black rounded mx-2 p-1" ref={amountRef} required />
            </div>
            <br />
            <div>
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" className="border border-black rounded mx-2 p-1" ref={descriptionRef} required />
            </div>
            <br />
            <div>
                <label htmlFor="category">Category:</label>
                <select className="mx-2 rounded p-1" ref={categoryRef}>
                    <option value="Fuel">Fuel</option>
                    <option value="Food">Food</option>
                    <option value="Electricity">Electricity</option>
                    <option value="Movie">Movie</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <br />
            <button type="submit" className="border-2 md:p-2 p-1 border-blue-500 rounded-lg hover:bg-blue-600 bg-white">Add Expense</button>
        </form>
    )
}

export default AddExpense;