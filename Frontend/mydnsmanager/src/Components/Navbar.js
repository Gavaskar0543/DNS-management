import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoIosGlobe } from "react-icons/io";

export default function Navbar() {
    const navigate = useNavigate();
    const handleNavigate = ()=>{
        navigate('/Home');
    }
  return (
    <dvi className="rounded drop-shadow-xl px-2 py-2 bg-green-300 flex justify-between items-center">
        <div>
            <ul className='flex items-center'>
                <li >
             <p className='px-1 font-semibold text-2xl'>    <IoIosGlobe /></p>
                </li>
                <li>
            <p className='text-2xl font-semibold drop-shadow-md hover:drop-shadow-xl cursor-pointer' onClick={()=>{handleNavigate()}}>DNS Manager</p>
            </li>
             </ul>
        </div>
        <div>
            <ul  className=' w-32 flex justify-between'>
                <li>username</li>
                <li>logout</li>
            </ul>
        </div>

    </dvi>)
}
