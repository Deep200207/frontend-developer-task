import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [messsage, setMessage] = useState("")
  const handleClick = async () => {
    console.log(name)
    console.log(email)
    console.log(password)
    const res = await fetch("http://localhost:5000/reg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });
    const data = await res.json();
    console.log(data.message);
    setMessage(data?.message);
  }
  return (
    <div>
      <div>
        <div className='flex justify-center items-center'>
          <div className=' w-[90%] md:w-[50%]'>
            <h1 className='text-2xl font-bold text-center text-blue-600 m-[10%] mb-[5%]'>Register Now</h1>
            <div className='flex justify-center items-center'>
              <div>
                <h1 className='text-center text-green-500 font-bold text-lg m-5'>{messsage}</h1>
                <div><h1 className='text-lg m-2 float-right font-semibold'>Username: <input type="text" placeholder='Name
              ' className='bg-slate-200 p-2 outline-0' onChange={(e) => setName(e.target.value)} /></h1></div>
                <div><h1 className='text-lg m-2 float-right font-semibold'>Email: <input type="text" placeholder='email
              ' className='bg-slate-200 p-2 outline-0' onChange={(e) => setEmail(e.target.value)} /></h1></div>
                <div><h1 className='text-lg m-2 float-right font-semibold'> Password: <input type="text"
                  placeholder='Password' className='p-2 outline-0 bg-slate-200' onChange={(e) => setPassword(e.target.value)} /></h1></div>
              </div>
            </div>
            <div className='flex justify-center items-center m-[5%]'>
              <div>
                <h1 className='text-center'>Already have account !
                  <Link to={"/login"} className='text-blue-600 font-bold ml-1'>Login Now</Link></h1>
                <div className='flex justify-center items-center mt-[5%]'>
                  <button className='text-white bg-blue-600 text-xl cursor-pointer p-2 rounded-xl
              ' onClick={() => handleClick()}>Register</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
