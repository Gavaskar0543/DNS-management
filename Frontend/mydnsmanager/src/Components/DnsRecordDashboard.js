import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import {ROOT_URL} from '../Urls/index';
import axios from 'axios';
import { error, success } from '../Config/toastify';

export default function DnsRecordDashboard() {
  const [domainName,setDomainName] = useState('');
  const [records,setrecords] = useState([]);
  const [ttl,setttl] = useState('');
  const [type ,settype] = useState('');
  const [nameserver,setnameserver]  = useState('');
  const [creating,setcreating] = useState(false);
  const [hostedid,setHostedId] = useState('');
  const navigate = useNavigate();
  const handleNavigateion = ()=>{
    navigate('/')
  }

  useEffect(() => {
  const currentUrl = window.location.href;

  // Create a URL object to extract parameters
  const url = new URL(currentUrl);

  // Extract parameters from the URL
  const params = new URLSearchParams(url.search);
   setDomainName(params.get('domainName')); // "tex.nt"
  let hostedId = params.get('hostedId');
  setHostedId(hostedId);
   // "Z03275771W0GD8QIGGL5F"
   const fetchData = async () => {
    try {
     
      const postUrl = `${ROOT_URL}/dns/getRecords?zoneId=${hostedId}`;
      const response = await axios.get(postUrl);
      console.log(response.data);
      setrecords(response.data)
    } catch (error) {
      console.error('Error:', error);
      // Handle error here, if needed
    }
  };
  fetchData();

}, [creating]);

const handleFormSubmit = async (e)=>{
  e.preventDefault();
  setcreating(true)
  let data = {
    type:type,
    ttl:ttl,
    value:nameserver,
    name:domainName
  }

  try {
     
    const postUrl = `${ROOT_URL}/dns/updateDNSRecords?hostedZoneId=${hostedid}`;
    const response = await axios.put(postUrl,data);
    console.log(response.data);
    success('New Record added')
    setcreating(false);
  } catch (err) {
    error('Something went wrong');
    setcreating(false);
    // Handle error here, if needed
  }
}
  return (
   <MyDNsDashboard>
    <div className=' w-full border'>
    <div className='px-4 shaodw-xl'>
      <p className='font-medium text-green-600'>Dns Record For:</p>
      <p className='font-semibod text-3xl '>{domainName}</p>
    </div>
    </div>
    <div className='py-4 mydashboard'>
      <div className='px-2 w-full border mb-3  '>
        <p className='text-xl font-semibold drop-shadow-md'>Add DNS Record</p>
        <form onSubmit={handleFormSubmit}>
        <table className='mt-2 w-full table-auto border-collapse  border border-slate-500'>
          <thead>
           <tr>
            <th className='border border-slate-600'>Type</th>
            <th className='border border-slate-600'>TTL</th>
            <th className='border border-slate-600'>NameServer</th>

            <th className='border border-slate-600'>Action</th>

            
           </tr>
           
           </thead>
           <tbody>
          
        
           <td class=" w-32">
  <select style={{width:'200px'}}
  value={type}
  onChange={(e)=>settype(e.target.value)}
  class="  appearance-none bg-white border border-gray-300 hover:border-gray-500 px-4 py-4 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
    <option value="" disabled selected>Select a DNS Record Type</option>
    <option value="A">A (Address) Record</option>
    <option value="AAAA">AAAA (IPv6 Address) Record</option>
    <option value="CNAME">CNAME (Canonical Name) Record</option>
    <option value="MX">MX (Mail Exchange) Record</option>
    <option value="NS">NS (Name Server) Record</option>
    <option value="PTR">PTR (Pointer) Record</option>
    <option value="SOA">SOA (Start of Authority) Record</option>
    <option value="SRV">SRV (Service) Record</option>
    <option value="TXT">TXT (Text) Record</option>
    <option value="DNSSEC">DNSSEC</option>
  </select>
 
</td>


           
           
            <td className='text-center border border-slate-700'>
            <input type='text' className='w-full h-full py-4 px-1  appearance-none focus:outline-none'
             value={ttl}
             onChange={(e) => setttl(e.target.value)}
            placeholder='0.0.0.0'/>

            </td>
            <td className='text-center border border-slate-700'>
            <input type='text' className='w-full h-full py-4 px-1  appearance-none focus:outline-none'
            value={nameserver}
            onChange={(e) => setnameserver(e.target.value)}
            placeholder='.ns.net'/>

            </td>
            <td className='text-center border border-slate-700 py-2'>
              {creating ? (
                              <button className='text-sm rounded bg-green-400 hover:bg-green-800 text-white font-medium px-2 py-2'> Adding Record</button>
              ): (
                              <button type='submit' className='text-md rounded bg-green-400 hover:bg-green-800 text-white font-medium px-2 py-2'> Add Record</button>

              )}
              </td>
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
            <th className='border border-slate-600'>TTL</th>
            <th className='border border-slate-600'>NameServers</th>

            
           </tr>
           </thead>
           <tbody>
            {records.map((item,index) =>(
           <tr>
           <td className='text-center border border-slate-700'>{item.Type}</td>
            <td className='text-center border border-slate-700'>{item.TTL}</td>
            <td className='text-center border border-slate-700'>
              {item.ResourceRecords.map((item,index)=>(
               
               <>
                <p className='text-sm font-semibold'>{item.Value}</p>
                <hr/>
               </>
                
              ))}
            </td>
           </tr>
          ) )}
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
