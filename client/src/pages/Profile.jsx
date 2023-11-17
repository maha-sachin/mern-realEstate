import React from 'react'
import {useSelector} from "react-redux"

function Profile() {
  const {currentUser} = useSelector((state)=>state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='font-semibold text-3xl text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img className="rounded-full h-24 w-24 self-center object-cover cursor-pointer mt-2" h-24 w-20 src={currentUser.avatar} alt="" />
        <input className='border p-3 rounded-lg' type='text' id='username' placeholder='Enter UserName' />
        <input className='border p-3 rounded-lg' type='text' id='email' placeholder='Enter Email' />
        <input className='border p-3 rounded-lg' type='text' id='password' placeholder='Enter PassWord' />
        <button className='bg-slate-700 rounded-lg text-white p-3 uppercase hover:opacity-95 disabled:opacity-70'>update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 uppercase cursor-pointer'>delete account?</span>
        <span className='text-red-700 uppercase cursor-pointer'>sign out</span>
        
      </div>

    </div>
  )
}

export default Profile