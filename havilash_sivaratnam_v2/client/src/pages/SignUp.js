import React, { useEffect, useRef } from 'react'
import { readForm } from '../functions'


export default function SignUp() {
  const formRef = useRef(null)

  async function handleSubmit(){
    const formData = readForm(formRef.current)
    console.log(JSON.stringify(formData))
    const rawResponse = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const content = await rawResponse.json();

    console.log(content);
  }

  return (
    <div className='container w-full h-screen flex justify-center items-center'>

      <form ref={formRef} onSubmit={handleSubmit} action='javascript:void(0);' className='min-w-[50%] p-8 shadow-md'>
        <div>
          <label htmlFor="username" className="label">Username</label>
          <input type="text" name="username" id="username" className="input" required />
        </div>
        <div className="mt-5">
          <label htmlFor="email" className="label">Email</label>
          <input type="email" name="email" id="email" className="input" placeholder="you@example.com" required />
        </div>
        <div className="mt-5">
          <label htmlFor="password" className="label">Password</label>
          <input type="password" name="password" id="password" className="input" placeholder='********' required />
        </div>
        <div className="mt-5 flex items-baseline justify-between">
          <input type='submit' value='Sign Up'
          className="cursor-pointer px-6 py-2 mt-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900" />
          <a href="/login" className="text-sm text-blue-600 hover:underline">Log in</a>
        </div>
      </form>

    </div>
  )
}
