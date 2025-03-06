import React from 'react';
import './index.css'
import { Outlet } from 'react-router-dom';
import NavbarMinimal from './Components/NavBar.jsx'
function App() {
  
  return (
   
    <>
    <div className='app-container'>
      <div className='navbar'> <NavbarMinimal /></div>
      <div className='content'> 
        <Outlet /></div>
    </div>
      
     
    </>
  )
}

export default App
