import React from 'react'
import Styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
export default function SigninComponent() {
    const navigate = useNavigate();
    const handlenavigation = () =>{
            navigate('/');
    }
    const handleFormSubmit = (event)=>{
             event.preventDefault();
             navigate('/Home')
    }
  return (
   <Signin className=''>
        <div className='form rounded-xl shadow-xl '>
            <p className='text-center font-semibold text-4xl px-2 py-2 text-green-400 drop-shadow-md hover:drop-shadow-xl'>DNS Manager</p>
             <div className=' mt-4'>
            <form className='h-full  w-full px-1 py-2 flex flex-col jsutify-between items-center ' onSubmit={handleFormSubmit}>
               
            {/* <div className='mb-3'>
                <input type='text' 
                        className="font-semibold shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder='Name'/>

            </div> */}

            <div className='mb-3'>
                <input type='email' 
                        className=" font-semibold shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                placeholder=' Enter email address' required />

            </div>
            <div className='mb-3'>
                <input type='password' 
                        className="font-semibold shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder='Enter password'/>

            </div>
           
            <div className='mt-3 mb-3'>
               <button className='rounded shadow-xl text-white bg-green-600 px-2 py-2 text-xl font-semibold hover:bg-green-800 w-64'>Login</button>

            </div>
               
               
            </form>
            <div className='mt-3 mb-2 text-center'>
                <p onClick={()=>{handlenavigation()}} className='text-sm font-semibold text-green-400 drop-shadow-md cursor-pointer hover:drop-shadow-xl'>New user register here</p>
            </div>
            </div>
        </div>
   </Signin>
  )
}

const Signin = Styled.div`
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
