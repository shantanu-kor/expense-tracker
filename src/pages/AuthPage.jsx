import React, { useState } from 'react'
import SignUp from '../components/SignUp';
import LogIn from '../components/LogIn';

const AuthPage = () => {
  const [login, setLogin] = useState(false);

  const toggleLogin = () => {
    setLogin(prevState => !prevState);
  };

  return (
    <React.Fragment>
      {login ? <LogIn /> : <SignUp />}
      <div className='text-center md:text-2xl text-1xl'>
        <button onClick={toggleLogin} className="border-2 md:p-2 p-1 border-red-500 rounded-lg hover:bg-red-600 bg-white">{login ? "New user? Signup" : "Already a user? Login"}</button>
      </div>
    </React.Fragment>

  )
}

export default AuthPage;