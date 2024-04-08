import React from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
export default function DnsRecordDashboard() {
  const navigate = useNavigate();
  const handleNavigateion = ()=>{
    navigate('/')
  }
  return (
   <MyDNsDashboard>
    <div className=' w-full border'>
    <div className='px-4 shaodw-xl'>
      <p className='font-medium text-green-600'>Dns Record For:</p>
      <p className='font-semibod text-3xl '>example.com</p>
    </div>
    </div>
    <div className='py-4 mydashboard'>
      <div className='px-2 w-full border mb-3  '>
        <p className='text-xl font-semibold drop-shadow-md'>Add DNS Record</p>
        <form>
        <table className='mt-2 w-full table-auto border-collapse  border border-slate-500'>
          <thead>
           <tr>
            <th className='border border-slate-600'>Type</th>
            <th className='border border-slate-600'>Hostname</th>
            <th className='border border-slate-600'>Content</th>
            <th className='border border-slate-600'>TTL</th>
            <th className='border border-slate-600'>Proxy Status</th>
            <th className='border border-slate-600'>Action</th>

            
           </tr>
           
           </thead>
           <tbody>
           <td className='text-center border border-slate-700'>example</td>
            <td className='text-center border border-slate-700'><input type='text' className='w-full h-full py-4 px-1 appearance-none' placeholder='@hostname'/></td>
            <td className='text-center border border-slate-700'>example</td>
            <td className='text-center border border-slate-700'>example</td>
            <td className='text-center border border-slate-700'>example</td>
            <td className='text-center border border-slate-700 py-2'><button className='text-md rounded bg-green-400 hover:bg-green-800 text-white font-medium px-2 py-2'> Add Record</button></td>
           </tbody>

          </table>
        </form>
      </div>
      <div className='px-2 w-full border '>
        <p className='text-xl font-semibold drop-shadow-md'>DNS Record</p>
       
        <table className='mt-2 w-full table-auto border-collapse  border border-slate-500'>
          <thead>
           <tr>
            <th className='border border-slate-600'>Type</th>
            <th className='border border-slate-600'>Hostname</th>
            <th className='border border-slate-600'>Content</th>
            <th className='border border-slate-600'>TTL</th>
            <th className='border border-slate-600'>Proxy  Status</th>
            <th className='border border-slate-600'>Action</th>

            
           </tr>
           </thead>
           <tbody>
           <td className='text-center border border-slate-700'>example</td>
            <td className='text-center border border-slate-700'>example</td>
            <td className='text-center border border-slate-700'>example</td>
            <td className='text-center border border-slate-700'>example</td>
            <td className='text-center border border-slate-700'>example</td>
            <td className='text-center border border-slate-700'>example</td>
           </tbody>

          </table>
      
       
      </div>


    </div>

   </MyDNsDashboard>
  )
}


const MyDNsDashboard = styled.div`
width:100%;
height:100%;
background:#f5f7fa;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;

.mydashboard{
    width:94vw;
    height:80vh;
    backgound:white;
    border:1px solid red;
    margin-top:5vh;
}

`
