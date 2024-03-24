import React from 'react';
import { CSVLink } from 'react-csv';
import { useSelector } from 'react-redux';

const DownloadCSV = () => {
    const headers = [
        { label: "Date", key: "date" },
        { label: "Amount", key: "amount" },
        { label: "Description", key: "description" },
        { label: "Category", key: "category" }
    ]

    const data = useSelector(state => state.expense.expenses);

    return (
        <div className="text-center md:m-8 m-4">
            <CSVLink data={data} headers={headers} filename='expenses.csv' className="md:text-2xl text-1xl border-2 md:p-2 p-1 border-red-500 rounded-lg hover:bg-red-600 bg-white m-4">
                Download Expenses
            </CSVLink>
        </div>

    )
}

export default DownloadCSV;