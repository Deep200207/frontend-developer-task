import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Navbar from './Navbar.jsx'

export default function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Dashboard></Dashboard>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/reg' element={<Register></Register>}></Route>
      </Routes>
    </div>
  )
}
