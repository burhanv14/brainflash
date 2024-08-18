import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate();
  return (
    <div class="sticky top-0 w-full max-h-24 flex justify-between bg-green-600 z-0">
        <button class="text-3xl md:text-4xl text-black font-mono font-extrabold ml-10 p-3 pl-0 md:p-4" onClick={()=>{navigate('/')}}>BrainFlash</button>
        <button class="font-medium text-black hover:text-white  font-sans focus:outline-none underline underline-offset-2 focus:text-white mr-10 md:p-4" onClick={()=>{navigate('/login')}}>Admin</button>
    </div>
  )
}


