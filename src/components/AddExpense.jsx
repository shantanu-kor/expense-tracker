import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { expenseActions } from '../store/expenseSlice';
import { premiumActions } from '../store/premiumSlice';

const AddExpense = () => {
    const amountRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();
    const dateRef = useRef();

    const dispatch = useDispatch();
    const premium = useSelector(state => state.premium.premium);

    useEffect(() => {
        const script = document.createElement("script");

        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    const premiumHandler = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_BE_URL}/purchase/premium-membership`, {
            headers: {
                "Authorization": token
            }
        })
        const data = await response.json();
        let options = {
            "key": data.key_id,
            "order_id": data.order.id,
            "handler": async function (response) {
                await fetch(`${import.meta.env.VITE_BE_URL}/purchase/update-transaction-status`, {
                    method: "POST",
                    body: JSON.stringify({
                        order_id: options.order_id,
                        payment_id: response.razorpay_payment_id
                    }),
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json"
                    }
                });
                alert("You are a Premium User now!");
                dispatch(premiumActions.setTrue());
            }
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();

        rzp1.on('payment.failed', async function (response) {
            console.log(response);
            await fetch(`${import.meta.env.VITE_BE_URL}/purchase/payment-failed`, {
                method: "POST",
                body: JSON.stringify({
                    order_id: data.order.id
                }),
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            })
            alert('Something went wrong');
        })
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        const amount = amountRef.current.value;
        const description = descriptionRef.current.value;
        const category = categoryRef.current.value;
        const date = dateRef.current.value;

        let data = await fetch(`${import.meta.env.VITE_BE_URL}/expense/add-expense`, {
            method: "POST",
            body: JSON.stringify({ amount, description, category, date }),
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('token')
            }
        })
        data = await data.json();
        if (data.success) {
            dispatch(expenseActions.addExpense(data.data));
            amountRef.current.value = '';
            descriptionRef.current.value = '';
            categoryRef.current.value = 'Fuel';
            dateRef.current.value = '';
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
            <div>
                <label htmlFor="date">Date:</label>
                <input type="date" id="date" className="border border-black rounded mx-2 p-1" ref={dateRef} required/>
            </div>
            <br />
            <button type="submit" className="border-2 md:p-2 p-1 border-blue-500 rounded-lg hover:bg-blue-600 bg-white">Add Expense</button>
            <br />
            {!premium &&
                <button id="rzp-button1" className="border-2 md:p-2 p-1 border-red-500 rounded-lg hover:bg-red-600 bg-white m-4" onClick={premiumHandler}>Buy Premium</button>
            }
        </form>
    )
}

export default AddExpense;