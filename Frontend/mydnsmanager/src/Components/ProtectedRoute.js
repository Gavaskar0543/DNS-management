import React from 'react'
import { UseDispatch,useSelector } from 'react-redux'
import HomePage from '../Pages/HomePage';
import SigninComponent from './AuthComponents/SigninComponent';
export default function ProtectedRoute() {
  const auth = useSelector((state) => state.auth);
  if(auth.user){
    return <HomePage/>
  }
  else{
    return <SigninComponent/>
  }
}
