import React from 'react';
import AuthPage from './pages/AuthPage';
import { useSelector } from 'react-redux';
import ExpensePage from './pages/ExpensePage';



function App() {
  const auth = useSelector(state => state.auth.auth);
  return (
    <React.Fragment>
      {auth ? <ExpensePage /> : <AuthPage />}
    </React.Fragment>
  )
}

export default App
