import React, { useEffect, useState } from 'react'

import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { ROOT_URL } from '../Urls';
import {  useSelector } from 'react-redux';
import { warning,success,error } from '../Config/toastify';
export default function Dashboard() {
  const [domains, setDomains] = useState([]);
  const [domainName,setdomainName] = useState('');
   // State to store domains data
   const [creating,setcreating] = useState(false);
   const [startD,setStartD] = useState(false);
 const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleNavigation = (name,id)=>{
    navigate(`/dnsrecord?domainName=${name}&hostedId=${id}`)
  }
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          id:auth.userId
        };
        const postUrl = `${ROOT_URL}/domain/getdomainsbyid`;
        const response = await axios.post(postUrl, data);
        setDomains(response.data.data);
      } catch (error) {
        console.error('Error:', error);
        // Handle error here, if needed
      }
    };
    fetchData();
   }, [domainName,startD]);
  
   

   const handleFormSubmit =async (e)=>{
e.preventDefault();
if(domainName === ''){
  warning(" please enter domain name");
  return;
}
setcreating(true)

  try {
    const data = {
     userId :auth.userId,
     name :domainName
    };
    const postUrl = `${ROOT_URL}/domain/createHostedZone`;
    const response = await axios.post(postUrl, data, {
      headers: {
        'Authorization': `Bearer ${auth.authToken}`
      }});
     success("Domain name added")
     setcreating(false);
     setdomainName('');
  } catch (err) {
    console.error('Error:', err);
    error("Something went wrong")
    setcreating(false);
    // Handle error here, if needed
  }

   }
   const handleDelete = async (id) =>{
  setStartD(true)
    try {
   
      const postUrl = `${ROOT_URL}/domain/deleteHostedZone?hostedZoneId=${id}`;
      const response = await axios.delete(postUrl, {
        headers: {
          'Authorization': `Bearer ${auth.authToken}`
        }});
       success("Domain deleted")
       setStartD(false)

    } catch (err) {
      console.error('Error:', err);
      error("Something went wrong")
      setStartD(false);
      
      // Handle error here, if needed
    }
   }

  return (
   <MyDashboard>
    <div className='py-4 mydashboard'>
      <div className='mb-3 px-2'>
        <p className='text-4xl font-extrabold'>Domain</p>
        <p className='text-sm font-semibold py-2'>List of  domains from aws route53</p>
      </div>
      <div>
        <form  className='w-1/2 px-2 ' onSubmit={handleFormSubmit}>
        <div className='flex flex-wrap justify-between items-center'>
            <div>
            <p className='text-md font-medium'>Domain Name</p>
            <input className='w-64 px-1 py-2 focus:outline-none' id='doaminname' type='text'
             placeholder='example.com'
             value={domainName}
             onChange={(e) => setdomainName(e.target.value)}
             />
            </div>
            <div>
              {creating ? (
                               <button className='rounded text-white px-2 py-2 text-sm bg-green-600 hover:bg-green-800'> Adding new Domain</button>

              ) : (
                               <button type="submit" className='rounded text-white px-2 py-2 w-32 bg-green-600 hover:bg-green-800'> Add Domain</button>

              )

              }
            </div>
        </div>
      
    
        </form>

      </div>

      <div className='mt-2 px-2 py-3 border rounded-lg shadow-xl bg-red-200'>
        <table className='mt-2 w-full table-auto border-collapse  border border-slate-500'>
          <thead>
           <tr>
            <th className='border border-slate-600'>Domain name</th>
            <th className='border border-slate-600'>Status</th>
            <th className='border border-slate-600'>Action</th>
           </tr>
          </thead>
          <tbody>
       {domains.map((item,index) =>(  
    <tr key={index} >
      <td onClick={()=>{handleNavigation(item.domainName,item.hostedZoneId)}} className='text-center border border-slate-700 underline text-blue-800 font-medium cursor-pointer'>{item.domainName}</td>
      <td className='text-center border border-slate-700'>{item.domainInfo.ChangeInfo.Status}</td>
       
                <td onClick={()=>{handleDelete(item.hostedZoneId)}} className='text-center border border-slate-700 text-red-600 font-semibold'><p className='cursor-pointer text-sm'>Remove</p></td>

     
    </tr>
  ))} 

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
   
    margin-top:5vh;
}

`
