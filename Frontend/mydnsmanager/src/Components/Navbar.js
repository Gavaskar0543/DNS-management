import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoIosGlobe } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { logout, setUser } from '../Redux/Reducer/authSlice';
import { useDispatch } from 'react-redux';

export default function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleNavigate = ()=>{
        navigate('/Home');
    }

 const handlelogout = () =>{
    navigate('/signin')
dispatch(logout());
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
                
                <li>
                    <p  className='cursor-pointer text-2xl font-semibold' onClick={handlelogout}><IoLogOut/></p>
                </li>
            </ul>
        </div>

    </dvi>)
}
