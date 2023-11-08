import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'


//const restcall = fetch

function SignUp() {

  const [formData,setFormData]=useState({})
  const [error,setError]=useState(null)
  const [loading,setLoading]=useState(false)
  const navigate = useNavigate()

  const handleChange =(e)=>{
    // const {name,value} = input.target
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
    
  }
  // console.log(formData)
 
  const handleSubmit = async (e)=>{
    e.preventDefault()

    try{

      setLoading(true)
      //use fetch method to Req api route
      
      const res = await fetch('/api/auth/signup',
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
        setLoading(false)
        //console.log(data.errMessage)
        setError(data.errMessage)
        return;
      }
      setLoading(false)
      //setError(null)
      navigate('/sign-in')
    }catch(error){
      setLoading(false)
      setError(error.errMessage)

    }

  }


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl my-7 text-center font-semibold'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text' placeholder='enter username' className='border p-3 rounded-lg' id ='username' onChange={handleChange} />
        <input type='email' placeholder='enter email' className='border p-3 rounded-lg' id ='email' onChange={handleChange}/>
        <input type='password' placeholder='enter password' className='border p-3 rounded-lg' id ='password' onChange={handleChange}/>

        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-75'>
         { loading ? "is loading..." : "Sign Up"}
          </button>
      </form>
      <div className='flex gap-4 mt-5'>
        <p>Have an account?</p>
        <Link to={"/sign-in"}><span className='text-blue-700'>sign in</span></Link>
      </div>
      {error  && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignUp