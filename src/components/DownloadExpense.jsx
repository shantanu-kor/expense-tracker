import React, { useState } from "react";
// import { CSVLink } from 'react-csv';
// import { useSelector } from 'react-redux';

const DownloadExpense = () => {
  // const headers = [
  //     { label: "Date", key: "date" },
  //     { label: "Amount", key: "amount" },
  //     { label: "Description", key: "description" },
  //     { label: "Category", key: "category" }
  // ]

  // const data = useSelector(state => state.expense.expenses);

  // return (
  //     <div className="text-center md:m-8 m-4">
  //         <CSVLink data={data} headers={headers} filename='expenses.csv' className="md:text-2xl text-1xl border-2 md:p-2 p-1 border-red-500 rounded-lg hover:bg-red-600 bg-white m-4">
  //             Download Expenses
  //         </CSVLink>
  //     </div>

  // )

  const [urls, setUrls] = useState([]);

  const downloadHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BE_URL}/expense/download-expense`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        let a = document.createElement("a");
        a.href = data.fileUrl;
        a.click();
        setUrls(data.expenseUrls);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Unable to download expenses");
    }
  };

  return (
    <div className="text-center md:text-2xl text-1xl md:m-8 m-4">
      <button
        className="border-2 md:p-2 p-1 border-red-500 rounded-lg hover:bg-red-600 bg-white m-4"
        onClick={downloadHandler}
      >
        Download Expenses
      </button>
      <ol className="list-decimal list-inside">
        {urls.map((item) => (
          <li key={item.expenseUrl}>
            <a href={item.expenseUrl}>{item.expenseUrl}</a>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default DownloadExpense;
