import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate();
  return (
    <div class="sticky top-0 w-full max-h-24 flex justify-between z-0">
        <button class="text-3xl md:text-5xl text-green-600 font-mono font-extrabold ml-10 p-3 pl-0 md:p-4" onClick={()=>{navigate('/')}}>BrainFlash</button>
        <div class="justify my-2 gap-4">
        <button class="font-medium text-green-600 hover:text-zinc-600  font-sans focus:outline-none hover:underline hover:underline-offset-2 focus:text-white mr-10 md:p-4" onClick={()=>{navigate('/login')}}>Admin</button>
        <button class="font-medium text-green-600 hover:text-zinc-600  font-sans focus:outline-none hover:underline hover:underline-offset-2 focus:text-white mr-10 md:p-4" onClick={()=>{navigate('/quiz')}}>Take a Quiz!</button>
        </div>
    </div>
  )
}


