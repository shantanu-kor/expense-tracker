import React from 'react'

const SignUp = () => {
    return (
        <React.Fragment>
            <form className="md:text-3xl text-1xl text-center md:p-6 md:my-14 p-3 my-7 border-blue-600 border-2 md:mx-[30%] mx-[10%]">
                <h2>SignUp</h2>
                <br />
                <table className='md:ml-[7%]'>
                    <tbody>
                        <tr>
                            <td style={{textAlign: 'right'}}>
                                <label htmlFor="name">Name: </label>
                            </td>
                            <td>
                                <input type="text" id="name" className='border-2 border-blue-400 rounded'/>
                            </td>
                        </tr>
                        <br />
                        <tr>
                            <td style={{textAlign: 'right'}}>
                                <label htmlFor="email">Email: </label>
                            </td>
                            <td>
                                <input type="email" id="email" className='border-2 border-blue-400 rounded'/>
                            </td>
                        </tr>
                        <br />
                        <tr>
                            <td style={{textAlign: 'right'}}>
                                <label htmlFor="password">Password: </label>
                            </td>
                            <td>
                                <input type="password" id="password" className='border-2 border-blue-400 rounded'/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </React.Fragment>
    )
}

export default SignUp;