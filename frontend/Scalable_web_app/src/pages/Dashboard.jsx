import React, { useContext } from 'react'
import { UserContext } from '../UserContext'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const [change, setChange] = useState(false);
  const [isEdit, setisEdit] = useState("");
  const [task, setTask] = useState([])
  const [title, setTitle] = useState("")
  const [des, setDes] = useState("s")
  const handleCreate = async () => {
    const token = localStorage.getItem("token");
    console.log(token)
    const res = await fetch("http://localhost:5000/addTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        description: des
      })
    })
    const data = await res.json();
    console.log(data)
    fetchTasks();
  }
  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/fetchTask", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    console.log(data)
    setTask(data || []);
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  const updateTask = async(id, editdescription) => {
    const token=localStorage.getItem("token")
    const res=await fetch(`http://localhost:5000/update/${encodeURIComponent(id)}`,{
      method:"PUT",
      headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        description:editdescription
      })
    })
    console.log(id)
    console.log(editdescription)
    setDes("")

  }
  const deleteTask= async(id)=>{
    const token=localStorage.getItem("token");
    const res= await fetch(`http://localhost:5000/delete/${encodeURIComponent(id)}`,{
      method:"DELETE",  
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    fetchTasks();
  }
  return (
    <div>
      {user ?
        <div>
          <div>
            <h1 className='m-5 font-semibold text-xl'>Hello, Welcome {user}!!</h1>
          </div>
          <div>
            {task.length > 0 ? (
              <div className="w-[90%] md:w-[100%] space-x-4 grid grid-cols-1 md:grid-cols-3 justify-center items-center">
                {task.map((item, index) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-lg p-4 m-5 border
                    min-h-40"
                  >
                    <h1 className='text-center font-semibold m-2'> Task: {index + 1}</h1>
                    <h2 className="text-xl text-center font-semibold text-blue-600">
                      Title: {item.title}
                    </h2>
                    <p className="text-gray-700 mt-2 flex">
                      Description: {item._id == isEdit ? <textarea
                        className='ml-1 outline-0 placeholder:text-gray-900 w-[80%]' placeholder={item.description}
                        onChange={(e) => setDes(e.target.value)}>
                      </textarea>:item.description}
                    </p>
                    <div className='flex justify-center items-center'>
                      <div>
                        <button className='text-white bg-red-500 p-1 rounded m-2' onClick={()=>deleteTask(item._id)} >Delete</button>
                        {item._id == isEdit ? <button className='text-white bg-green-500 p-1 rounded m-2' onClick={() => updateTask(item._id,des)}>Update</button> :
                          <button className='bg-blue-600 text-white p-1 rounded' onClick={() => setisEdit(item._id)}>Edit</button>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
              : <div className='text-center mb-[5%]'>
                <h1 className='text-lg'>No Task Added Yet</h1>
              </div>}
          </div>
          <div className='flex justify-center items-center'>
            <div>
              <div className='flex justify-center items-center'><button className='text-xl 
              bg-blue-500 text-white p-2 rounded cursor-pointer '
                onClick={() => setChange(!change)}>Add Task</button></div>
              {
                change ?
                  <div className='mt-[5%]  flex justify-center items-center'>
                    <div className='sm:w-[50%]  border-1 p-2 rounded'>
                      <h1 className=' md:text-lg sm:float-right  flex'>Task Title <input type="text" placeholder='Title'
                        className='p-1 ml-2 outline-0 bg-slate-300 float-right ' onChange={(e) => setTitle(e.target.value)} />
                      </h1>
                      <div className='mt-[5%] sm:float-right flex md:text-lg'><h1 className='p-1
                      '>Description</h1><textarea rows="5" cols="22" className='float-right w-[80%] p-1 md:p-2 bg-slate-300 outline-0
                      ' placeholder='write description' onChange={(e) => setDes(e.target.value)}></textarea>
                      </div>
                      <div className='flex w-[100%] justify-center items-center p-2'>
                        <button className='bg-blue-500 text-white p-2 rounded-xl' onClick={() => handleCreate()} >Add</button>
                      </div>
                    </div>
                  </div>
                  :
                  ""
              }
            </div>
          </div>
        </div>
        : <div className='flex items-center justify-center mt-[10%]'>
          <div>
            <h1 className='text-4xl'>Scalable Web-App</h1>
            <h1 className='text-center mt-[10%] text-xl'>Login For Access Dashboard</h1>
            <h1 className='text-center mt-[10%] text-xl text-white
           cursor-pointer p-2'><Link className='bg-blue-500 p-2 rounded-xl' to={"/login"}>Login</Link></h1>
          </div>
        </div>}
    </div>
  )
}
