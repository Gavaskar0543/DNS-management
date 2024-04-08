import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Styled from 'styled-components'
import { success ,error} from '../../Config/toastify';
import {requestNewUserAccount} from '../../Api'
export default function SignupComponent() {
    const [username,setusername] = useState('');
    const [email,setemail] = useState('');
    const [password,setpassword] = useState('');
    const navigate = useNavigate();
    const handlenavigation = () =>{
        navigate('/signin');
}

const handleFormSubmit = async (e)=>{
e.preventDefault();
let data = {
    username:username,
    email:email,
    password:btoa(password)
}
try{
    const response = await requestNewUserAccount(data);
if(response.success){
    success('Account Created')
    navigate('/signin');
}
else{
    error('something went wrong')
}
}
catch(error){
    error('something went wrong try after sometime')
}
}
  return (
   <SignUp className='' onSubmit={handleFormSubmit}>
        <div className='form rounded-xl shadow-xl '>
            <p className='text-center font-semibold text-4xl px-2 py-2 text-green-400 drop-shadow-md hover:drop-shadow-xl'>DNS Manager</p>
             <div className=' mt-4'>
            <form className='h-full  w-full px-1 py-2 flex flex-col jsutify-between items-center '>
               
            <div className='mb-3'>
                <input type='text' 
                        className="font-semibold shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder='Name' 
                value={username}
                onChange={(e)=>{setusername(e.target.value)}}
                />

            </div>

            <div className='mb-3'>
                <input type='email' 
                        className=" font-semibold shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                placeholder=' Enter email address'
                value={email}
                onChange={(e)=>{setemail(e.target.value)}}
                required />

            </div>
            <div className='mb-3'>
                <input type='password' 
                        className="font-semibold shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder='Set password'
                
                value={password}
                onChange={(e)=>{setpassword(e.target.value)}}
                />

            </div>
           
            <div className='mt-3 mb-3'>
               <button className='rounded shadow-xl text-white bg-green-600 px-2 py-2 text-xl font-semibold hover:bg-green-800 w-64'>Create</button>

            </div>
               
               
            </form>
            <div className='mt-3 mb-2 text-center'>
                <p onClick={()=>{handlenavigation()}} className='text-sm font-semibold text-green-400 drop-shadow-md cursor-pointer hover:drop-shadow-xl'>Already registered let me signin</p>
            </div>
            </div>
        </div>
   </SignUp>
  )
}

const SignUp = Styled.div`
width:100vw;
height:100vh;
display:flex;
justify-content:center;
align-items:center;
background:#77b852;


.form{
    width:30vw;
    height:60vh;
    background:white;
}

`
