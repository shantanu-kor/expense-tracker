import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';

const LogIn = () => {
    const [inputWidth, setInputWidth] = useState(0);

    const emailRef = useRef();
    const passwordRef = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        function handleResize() {
            const formElement = document.getElementById('myForm');
            // const firstTdElement = document.getElementById('firstTd');

            if (formElement) {
                const formWidth = formElement.getBoundingClientRect().width;
                const width = Math.floor(Number(formWidth) / 2).toString() + 'px';
                // const firstTdWidth = firstTdElement.getBoundingClientRect().width;
                setInputWidth(width);
            }
        }

        handleResize(); // Initialize width on mount

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const submitHandler = async (event) => {
        event.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const loginUser = async () => {
            const res = await fetch('http://localhost:3000/user/login-user/', {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const statusCode = res.status;
            const data = await res.json();
            alert(data.message);
            if (statusCode !== 200) return false
            else return true
        }
    const res = await loginUser();
    if (res) {
        emailRef.current.value = '';
        passwordRef.current.value = '';
        dispatch(authActions.setTrue());
    }
};

return (
    <React.Fragment>
        <div className="md:text-3xl text-1xl text-center md:p-6 md:my-14 p-3 my-7 border-red-800 border-2 md:w-[40%] w-[70%] mx-auto bg-red-600">
            <h2>Login</h2>
            <br />
            <form className='mx-auto' id="myForm" onSubmit={submitHandler}>
                <table className='w-full'>
                    <tbody>
                        <tr>
                            <td className='text-right'>
                                <label htmlFor="email" style={{ width: inputWidth }}>Email: </label>
                            </td>
                            <td className='text-left'>
                                <input type="email" id="email" className='border-2 border-blue-400 rounded bg-indigo-200 p-1' style={{ width: inputWidth }} ref={emailRef} required />
                            </td>
                        </tr>
                        <br />
                        <tr>
                            <td className='text-right'>
                                <label htmlFor="password" style={{ width: inputWidth }}>Password: </label>
                            </td>
                            <td className='text-left'>
                                <input type="password" id="password" className='border-2 border-blue-400 rounded bg-indigo-200 p-1' style={{ width: inputWidth }} ref={passwordRef} required />
                            </td>
                        </tr>
                        <br />
                        <tr>
                            <td colSpan='2'><button type="submit" className="border-2 md:p-2 p-1 border-blue-500 rounded-lg hover:bg-blue-600 bg-white">Submit</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    </React.Fragment>
)
}

export default LogIn;