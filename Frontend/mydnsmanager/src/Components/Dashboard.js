import React from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
export default function Dashboard() {
  const navigate = useNavigate();
  const handleNavigateion = ()=>{
    navigate('/dnsrecord')
  }
  return (
   <MyDashboard>
    <div className='py-4 mydashboard'>
      <div className='mb-3 px-2'>
        <p className='text-4xl font-extrabold'>Domain</p>
        <p className='text-sm font-semibold py-2'>List of  domains from aws route53</p>
      </div>
      <div>
        <form  className='w-1/2 px-2 '>
        <div className='flex flex-wrap justify-between items-center'>
            <div>
            <p className='text-md font-medium'>Domain Name</p>
            <input className='w-64 px-1 py-2' id='doaminname' type='text' placeholder='example.com'/>
            </div>
            <div> <button className='rounded text-white px-2 py-2 w-32 bg-green-600 hover:bg-green-800'> Add Domain</button>
            </div>
        </div>
      
    
        </form>

      </div>

      <div className='mt-2'>
        <table className='mt-2 w-full table-auto border-collapse  border border-slate-500'>
          <thead>
           <tr>
            <th className='border border-slate-600'>Domain name</th>
            <th className='border border-slate-600'>Status</th>
            <th className='border border-slate-600'>Action</th>
           </tr>
          </thead>
          <tbody>
            <td onClick={()=>{handleNavigateion()}} className='text-center border border-slate-700 underline text-blue-800 font-medium cursor-pointer'>example</td>
            <td className='text-center border border-slate-700'>example</td>
            <td className='text-center border border-slate-700'>example</td>

          </tbody>
        </table>

      </div>
    </div>

   
   </MyDashboard>
  )
}


const MyDashboard = styled.div`
width:100%;
height:100%;
background:#f5f7fa;
display:flex;
justify-content:center;
align-item:center;

.mydashboard{
    width:94vw;
    height:80vh;
    backgound:white;
    border:1px solid red;
    margin-top:5vh;
}

`
