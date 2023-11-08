import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signInSucess, signInStart, signInFailure } from '../redux/user/userSlice'


function SignIn() {

  const [formData,setFormData]=useState({})
  const {error,loading}= useSelector((state)=>state.user)
  const dispatch = useDispatch()
  // const [error,setError]=useState(null)
  // const [loading,setLoading]=useState(false)
  const navigate = useNavigate()

  const handleChange =(e)=>{
   
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
    
  }
 
 
  const handleSubmit = async (e)=>{
    e.preventDefault()

    try{

      // setLoading(true)
      dispatch(signInStart())
      //use fetch method to Req api route
      
      const res = await fetch('/api/auth/signin',
      {
        method : 'POST',
        headers : {
          "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
      }
      )
  
      const data = await res.json()
      console.log(data)
      if (data.success === false){
        // setLoading(false)
        // setError(data.errMessage)
        dispatch(signInFailure(data.errMessage))
        return;
      }
      // setLoading(false)
      // //setError(null)
      dispatch(signInSucess(data))
      navigate('/')
    }catch(error){
      dispatch(signInFailure(error.errMessage))

    }

  }


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl my-7 text-center font-semibold'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='email' placeholder='enter email' className='border p-3 rounded-lg' id ='email' onChange={handleChange}/>
        <input type='password' placeholder='enter password' className='border p-3 rounded-lg' id ='password' onChange={handleChange}/>

        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-75'>
         { loading ? "is loading..." : "Sign In"}
          </button>
      </form>
      <div className='flex gap-4 mt-5'>
        <p>dont have an Account? </p>
        
        <Link to={"/signup"}><span className='text-blue-700'>Sign Up</span></Link>
      </div>
      {error  && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignIn