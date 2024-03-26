import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import AddExpense from '../components/AddExpense';
import ExpenseList from '../components/ExpenseList';
import Leaderboard from '../components/Leaderboard';

import { authActions } from '../store/authSlice';
import { expenseActions } from '../store/expenseSlice';
import { premiumActions } from '../store/premiumSlice';
import ExpenseReport from '../components/ExpenseReport';
import DownloadExpense from '../components/DownloadExpense';

const ExpensePage = () => {
  const dispatch = useDispatch();

  const [maxPage, setMaxPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [currPage, setCurrPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);

  const premium = useSelector(state => state.premium.premium);

  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.setfalse());
    localStorage.setItem("auth", false);
    dispatch(expenseActions.renewExpense());
    dispatch(premiumActions.setFalse());
  };

  useEffect(() => {
    async function func() {
      let count = await fetch('http://localhost:3000/expense/max-pages', {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      count = await count.json();
      if (count.success) {
        setMaxPage(Math.ceil(count.count / 10));
      }
      let data = await fetch('http://localhost:3000/user/is-premium', {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      data = await data.json();
      if (data.success) {
        dispatch(premiumActions.setTrue())
        alert("You are a premium user!")
      }
    }
    func();
  }, [])

  useEffect(() => {
    if (maxPage > 1) {
      setNextPage(2);
    }
  }, [maxPage])

  useEffect(() => {
    const func = async () => {
      let data = await fetch(`http://localhost:3000/expense/get-expenses/?page=${currPage}`, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      data = await data.json();
      dispatch(expenseActions.renewExpense());
      if (data.success) {
        for (let i of data.data) {
          dispatch(expenseActions.addExpense(i));
        }
      }
    };
    func();
  }, [currPage]);

  const prevHandler = (event) => {
    event.preventDefault();
    setCurrPage(prevState => prevState - 1);
    if (prevPage !== 1) {
      setPrevPage(prevState => prevState - 1);
    } else {
      setPrevPage(null);
    }
    if (nextPage !== null) {
      setNextPage(prevState => prevState - 1);
    } else {
      setNextPage(maxPage);
    }
  }

  const nextHandler = (event) => {
    event.preventDefault();
    setCurrPage(prevState => prevState + 1);
    setPrevPage(prevState => prevState + 1)
    if (nextPage !== maxPage) {
      setNextPage(prevState => prevState + 1);
    } else {
      setNextPage(null);
    }
  }

  const lastHandler = (event) => {
    event.preventDefault();
    setCurrPage(maxPage);
    setPrevPage(maxPage - 1);
    setNextPage(null);
  }

  return (
    <React.Fragment>
      <div className="text-right">
        <button onClick={logoutHandler} className="md:text-2xl text-1xl border-2 md:p-2 p-1 border-red-500 rounded-lg hover:bg-red-600 bg-white m-4">Logout</button>
      </div>
      <AddExpense />
      <h2 className="md:text-2xl text-1xl text-center md:m-4 m-2 md:p-2 p-1 text-white bg-violet-500">Expenses</h2>
      <ExpenseList />
      <div className="text-center md:text-2xl text-1xl">
        {prevPage && <button className="m-2 p-1 border border-black" onClick={prevHandler}>{prevPage}</button>}
        {currPage && <span className="m-2 p-1 border border-black bg-blue-500">{currPage}</span>}
        {nextPage && <button className="m-2 p-1 border border-black" onClick={nextHandler}>{nextPage}</button>}
        {maxPage !== 1 && <button className="m-2 p-1 border border-black" onClick={lastHandler}>Last Page: {maxPage}</button>}
      </div>
      {premium &&
        <React.Fragment>
          <DownloadExpense />
          <Leaderboard />
          <ExpenseReport />
        </React.Fragment>

      }
    </React.Fragment>
  )
}

export default ExpensePage;