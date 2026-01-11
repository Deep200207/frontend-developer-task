import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'

export default function Navbar() {
    const {user,setUser}=useContext(UserContext)
    const handleClick=()=>{
        setUser("");
        localStorage.removeItem("user_name")
        localStorage.removeItem("token")
    }
    return (
        <div>
            <div className=' bg-blue-500 text-xl p-2'>
                <div className='flex text-white'>
                    <Link to={"/"} className='float-left m-2 ml-[10%] cursor-pointer p-2'>Home</Link>
                    <div className=' w-full m-2 mr-[10%] '>
                        { user ? 
                        <>
                        <button className='text-white float-right ml-3 rounded-2xl bg-red-500 p-2 cursor-pointer'
                         onClick={()=>handleClick()}>Logout</button>
                        <h1 className='float-right ml-2 p-2'>{user}</h1>
                         </>:<>
                        <Link to={"/login"}className='float-right ml-2 p-2'>Login</Link>
                        <Link to={"/reg"} className='float-right mr-2 p-2'>Register</Link></> }
                    </div>
                </div>
            </div>
        </div>
    )
}
