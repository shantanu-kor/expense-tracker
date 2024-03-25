import React from 'react'
import { useSelector } from 'react-redux';

const ExpenseReport = () => {
    const data = useSelector(state => state.expense.expenses);
    let data1 = JSON.parse(JSON.stringify(data));
    let year = new Set();
    for (let i of data1) {
        i.date = i.date.split('-');
        year.add(i.date[0]);
    }
    year = Array.from(year).sort().reverse();
    const dataByYear = new Map();
    for (let i of data1) {
        if (dataByYear.get(i.date[0]) === undefined) {
            dataByYear.set(i.date[0], [i]);
        } else {
            dataByYear.set(i.date[0], [...dataByYear.get(i.date[0]), i]);
        }
    }
    for (let i of dataByYear.values()) {
        i.sort((a, b) => {
            if (a.date[1] === b.date[1]) {
                return b.date[2] - a.date[2];
            } else {
                return b.date[1] - a.date[1];
            }
        });
    }

    return (
        <React.Fragment>
            <div className='text-center md:text-2xl text-1xl md:m-4 m-2 md:p-2 p-1 text-white bg-violet-500'>Expense Report</div>
            {year.map(item => (
                <React.Fragment>
                    <h2 className='text-center md:text-2xl text-1xl md:m-4 m-2 md:p-2 p-1'>{item}</h2>
                    <table className="mx-auto md:text-2xl text-1xl md:my-4 my-2 md:p-2 p-1 border-collapse table-fixed">
                        <thead>
                            <tr>
                                <th className="border-black border">Date</th>
                                <th className="border-black border">Amount</th>
                                <th className="border-black border">Description</th>
                                <th className="border-black border">Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataByYear.get(item).map(item => (
                                <tr>
                                    <td className="border-black border">
                                        {item.date[0]}-{item.date[1]}-{item.date[2]}
                                    </td>
                                    <td className="border-black border">
                                        {item.amount}
                                    </td >
                                    <td className="border-black border">
                                        {item.description}
                                    </td>
                                    <td className="border-black border">
                                        {item.category}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </React.Fragment>
            ))}
        </React.Fragment>
    )
}

export default ExpenseReport;