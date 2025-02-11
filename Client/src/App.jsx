import { useState } from 'react'
import Navbar from "./Components/NavBar";
import {Button} from "./Components/ui/button"
import React from 'react';
import './index.css'
import { DropzoneButton } from './Components/Dropzone/DropzoneButton';
function App() {
  
  return (
    
    <>

      <Button>Hello</Button>
      <Navbar />
      <DropzoneButton/>
      </>
  )
}

export default App
