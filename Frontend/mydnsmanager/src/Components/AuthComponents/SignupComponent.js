import React from 'react'
import Styled from 'styled-components'
export default function SignupComponent() {
  return (
   <SignUp className=''>
        <div className='form rounded-xl shadow-xl '>
            <p className='text-center font-semibold text-4xl px-2 py-2 text-green-400 drop-shadow-md hover:drop-shadow-xl'>DNS Manager</p>
             <div className=' mt-4'>
            <form className='h-full  w-full px-1 py-2 flex flex-col jsutify-between items-center '>
               
            <div className='mb-3'>
                <input type='text' 
                        className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder='Name'/>

            </div>

            <div className='mb-3'>
                <input type='email' 
                        className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder=' your email address'/>

            </div>
            <div className='mb-3'>
                <input type='password' 
                        className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder='your password'/>

            </div>
           
            <div className='mt-3 mb-3'>
               <button className='rounded shadow-xl text-white bg-green-600 px-2 py-2 text-xl font-semibold hover:bg-green-800 w-64'>Create</button>

            </div>
               
               
            </form>
            <div className='mt-3 mb-2 text-center'>
                <p className='text-sm font-semibold text-green-400 drop-shadow-md cursor-pointer hover:drop-shadow-xl'>Already registered let me signin</p>
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
