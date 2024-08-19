import React, { useRef } from 'react'

const ForgotPassword = () => {
    const emailRef = useRef();

    const submitHandler = async (event) => {
        event.preventDefault();
        const res = await fetch(`${import.meta.env.VITE_BE_URL}/password/forgot-password`, {
            method: "POST",
            body: JSON.stringify({
                emailId: emailRef.current.value
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        })
        const data = res.json();
        if (!data.success) {
            alert(data.message);
        } else {
            emailRef.current.value = '';
        }
    }
    return (
        <form className="md:text-2xl text-1xl text-center rounded-lg p-4" onSubmit={submitHandler}>
            <label htmlFor="email">Email:</label>
            <input id="email" type="email" className="border border-black rounded mx-2 p-1" ref={emailRef} required />
            <br />
            <button className="border-2 md:p-2 p-1 border-blue-500 rounded-lg hover:bg-blue-600 bg-white md:m-4 m-2" type="submit">Submit</button>
        </form>
    )
}

export default ForgotPassword;