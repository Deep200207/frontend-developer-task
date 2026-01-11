import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("")
  const [error,setError]=useState("")
  const [message,setMessage]=useState("")
  const {setUser} = useContext(UserContext);

  const handleClick=async()=>{
    const res= await fetch("http://localhost:5000/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    const data=await res.json();
    setError(data?.error)
    setMessage(data?.message)
    if(data?.token){
      localStorage.setItem("token",data?.token)
      localStorage.setItem("user_name",data?.user.name)
      setUser(data?.user.name)
    }
  }
  return (
    <div>
      <div className='flex justify-center items-center'>
        <div className=' w-[90%] md:w-[50%]'>
          <h1 className='text-2xl font-bold text-center text-blue-600 m-[10%] mb-[5%]'>Login Now</h1>
          <div className='flex justify-center items-center'>
            <div>
                <h1 className='text-center text-green-500 font-bold text-lg m-5'>{message}</h1>
                <h1 className='text-center text-red-500 font-bold text-lg m-5'>{error}</h1>
              <div><h1 className='text-lg m-2 float-right font-semibold'>Email: <input type="text" placeholder='email
              ' className='bg-slate-200 p-2 outline-0'  onChange={(e)=>setEmail(e.target.value)}/></h1></div>
              <div><h1 className='text-lg m-2 float-right font-semibold'> Password: <input type="text"
               placeholder='Password' className='p-2 outline-0 bg-slate-200' onChange={(e)=>setPassword(e.target.value)}/></h1></div>
            </div>
          </div>
          <div className='flex justify-center items-center m-[5%]'>
            <div>
              <h1 className='text-center mb-[5%]'>Don't have Account
                 <Link to={"/reg"} className='text-blue-600
               font-bold ml-1'>Register Here</Link></h1>
            <div className='flex justify-center items-center'>
               <button className='text-white bg-blue-600 text-xl cursor-pointer p-2 rounded-xl'
            onClick={()=>handleClick()}>Login</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
