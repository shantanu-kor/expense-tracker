import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import AddExpense from '../components/AddExpense';
import ExpenseList from '../components/ExpenseList';
import Leaderboard from '../components/Leaderboard';

import { authActions } from '../store/authSlice';
import { expenseActions } from '../store/expenseSlice';
import { premiumActions } from '../store/premiumSlice';

const ExpensePage = () => {
  const dispatch = useDispatch();

  const premium = useSelector(state => state.premium.premium);

  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.setfalse());
    localStorage.setItem("auth", false);
    dispatch(expenseActions.renewExpense());
    dispatch(premiumActions.setFalse());
  };

  useEffect(() => {
    const func = async () => {
      let data = await fetch('http://localhost:3000/expense/get-expenses', {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      data = await data.json();
      if (data.success) {
        for (let i of data.data) {
          dispatch(expenseActions.addExpense(i));
        }
      }
      data = await fetch('http://localhost:3000/user/is-premium', {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      data = await data.json();
      if (data.success) {
        dispatch(premiumActions.setTrue())
        alert("You are a premium user!")
      }
    };
    func();
  }, [])

  return (
    <React.Fragment>
      <div className="text-right">
        <button onClick={logoutHandler} className="md:text-2xl text-1xl border-2 md:p-2 p-1 border-red-500 rounded-lg hover:bg-red-600 bg-white m-4">Logout</button>
      </div>
      <AddExpense />
      <h2 className="md:text-2xl text-1xl text-center md:m-4 m-2 md:p-2 p-1 text-white bg-violet-500">Expenses</h2>
      <ExpenseList />
      {premium &&
        <Leaderboard />
      }
    </React.Fragment>
  )
}

export default ExpensePage;