import { useState } from 'react'
import Navbar from "./Components/NavBar";
import React from 'react';
import './index.css'
import { DropzoneButton } from './Components/Dropzone/DropzoneButton';
function App() {
  
  return (
    
    <>
      <Navbar />
      <DropzoneButton/>
      </>
  )
}

export default App
