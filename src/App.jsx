import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AuthPage from './pages/AuthPage';
import ExpensePage from './pages/ExpensePage';

import { authActions } from './store/authSlice';

function App() {
  const auth = useSelector(state => state.auth.auth);
  const premium = useSelector(state => state.premium.premium)
  const dispatch = useDispatch();
  if (localStorage.getItem("auth") === "true") {
    dispatch(authActions.setTrue());
  }
  return (
    <React.Fragment>
      <h1 className='md:text-4xl text-2xl text-center border-2 border-black bg-violet-900 md:p-5 p-3 text-white'>{premium ? 'Daily Expense Tracker Premium' : 'Daily Expense Tracker'}</h1>
      {auth ? <ExpensePage /> : <AuthPage />}
    </React.Fragment>
  )
}

export default App
