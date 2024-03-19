import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';
import AddExpense from '../components/AddExpense';
import ExpenseList from '../components/ExpenseList';

const ExpensePage = () => {
  const dispatch = useDispatch();

  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.setfalse());
  };

  useEffect(() => {
    
  }, [])

  return (
    <React.Fragment>
      <div className="text-right">
      <button onClick={logoutHandler} className="md:text-2xl text-1xl border-2 md:p-2 p-1 border-red-500 rounded-lg hover:bg-red-600 bg-white m-4">Logout</button>
      </div>
      <AddExpense />
      <ExpenseList />
    </React.Fragment>
  )
}

export default ExpensePage;