import React from 'react'
import { useSelector } from 'react-redux';

const ExpenseReport = () => {
    const data = useSelector(state => state.expense.expenses);
    
  return (
    <div className='text-center md:text-2xl text-1xl md:m-4 m-2 md:p-2 p-1 text-white bg-violet-500'>ExpenseReport</div>
  )
}

export default ExpenseReport;