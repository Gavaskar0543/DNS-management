import React,{useState} from 'react'
import Styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { ROOT_URL } from '../../Urls';
import {success,error} from '../../Config/toastify'
import { useDispatch,useSelector } from "react-redux";
import { setUser,setAuthtoken, setUserID } from '../../Redux/Reducer/authSlice';
import axios from 'axios'
import {jwtDecode} from 'jwt-decode';

export default function SigninComponent() {
    const [email,setemail] = useState('');
    const [password,setpassword] = useState('');
    const [creating,setcreating]=useState(false);
    const navigate = useNavigate();
     const dispatch = useDispatch();


    const handlenavigation = () =>{
            navigate('/');
    }
 


    const handleFormSubmit = async (e)=>{
        e.preventDefault();
        let data = {
            email:email,
            password:btoa(password)
        } 
        setcreating(true)
        try{
           const postUrl = `${ROOT_URL}/user/createsession`
          await  axios.post(postUrl, data)
            .then(response => {
              success('Authentication Successfull!');
              dispatch(setUser)
              dispatch(setAuthtoken(response.data.data.token))
              const decodedToken = jwtDecode(response.data.data.token);
              const userId = decodedToken._id;
              dispatch(setUserID(userId));
              console.log(userId)
              navigate('/Home');
            })
            .catch(err => {
                setcreating(false);
                error('Something went wrong');
              console.error('Error:', err);
            });
        }
        catch(error){
            error('something went wrong try after sometime')
        }
        }
  return (
   <Signin className='' onSubmit={handleFormSubmit}>
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
                placeholder=' Enter email address' required
                value={email}
                onChange={(e)=>{setemail(e.target.value)}}
                />

            </div>
            <div className='mb-3'>
                <input type='password' 
                        className="font-semibold shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder='Enter password'
                value={password}
                onChange={(e)=>{setpassword(e.target.value)}}
                />

            </div>
           
            <div className='mt-3 mb-3'>
                     {creating ? (
                                       <button disabled className='rounded shadow-xl text-white bg-green-600 px-2 py-2 text-xl font-semibold hover:bg-green-800 w-64'>loging in</button>

                     ):(
                                       <button type='submit' className='rounded shadow-xl text-white bg-green-600 px-2 py-2 text-xl font-semibold hover:bg-green-800 w-64'>Login</button>

                     )}
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
