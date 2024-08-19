import React, { useState } from 'react'

const Leaderboard = () => {
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [leaderboard, setLeaderboard] = useState([]);

    const leaderboardHandler = async (event) => {
        event.preventDefault();
        const response = await fetch(`${import.meta.env.VITE_BE_URL}/premium/get-leaderboard`, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        })
        const data = await response.json();
        if (data.success) {
            setLeaderboard(data.data);
            setShowLeaderboard(true);
        } else {
            alert(data.message);
        }
    };

    const refreshHandler = async (event) => {
        event.preventDefault();
        const response = await fetch(`${import.meta.env.VITE_BE_URL}/premium/get-leaderboard`, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        })
        const data = await response.json();
        if (data.success) {
            setLeaderboard(data.data);
        } else {
            alert(data.message);
        }
    }

    return (
        <React.Fragment>
            {showLeaderboard ?
                <React.Fragment>
                    <h2 className="md:text-2xl text-1xl text-center md:m-4 m-2 md:p-2 p-1 text-white bg-violet-500">Leaderboard</h2>
                    <div className='md:text-2xl text-1xl text-center'>
                        <button onClick={refreshHandler} className="border-2 md:p-2 p-1 md:m-4 m-2 border-red-500 rounded-lg hover:bg-red-600 bg-white">Refresh Leaderboard</button>
                    </div>
                    <table className="mx-auto md:text-2xl text-1xl border-collapse table-fixed md:my-4 my-2">
                        <thead>
                            <tr>
                                <th className="border-black border">Name</th>
                                <th className="border-black border">Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map(item => (
                                <tr>
                                    <td className="border-black border text-center">{item.name}</td>
                                    <td className="border-black border text-center">{item.totalExpense}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </React.Fragment>
                :
                <div className='text-center md:text-2xl text-1xl m-2'>
                    <button onClick={leaderboardHandler} className="border-2 md:p-2 p-1 border-red-500 rounded-lg hover:bg-red-600 bg-white">Get Leaderboard</button>
                </div>
            }
        </React.Fragment>
    )
}

export default Leaderboard;