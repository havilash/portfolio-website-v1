import React, { useEffect, useRef, useState } from 'react'
import { readForm, authFetch } from '../functions'


export default function Login() {
  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const formRef = useRef(null);

  async function handleSubmit(){
    const formData = readForm(formRef.current);

    const rawResponse = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    const response = await rawResponse.json();
    
    if (rawResponse.ok) {  
      setError(null);
      setSuccess(response.message);
      localStorage.accessToken = response.accessToken;
      localStorage.refreshToken = response.refreshToken;
      const userRawResponse = await authFetch('/api/auth/user', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });

      const userResponse = await userRawResponse.json()
      console.log(userResponse)
      localStorage.user = JSON.stringify({ id: userResponse.id, username: userResponse.username });
      window.location.href = "/";
    }
    else {  
      setSuccess(null);
      setError(response.message);
    }
  }

  function renderMessage() {
    if (error != null) return <div className='error'>{error}</div>;
    if (success != null) return <div className='success'>{success}</div>;
  }

  return (
    <div className='container flex justify-center items-center'>

      <form ref={formRef} onSubmit={handleSubmit} action='javascript:void(0);' className='min-w-[50%] p-8 shadow-xl'>
        
        {renderMessage()}
        
        <div className='mt-5'>
          <label htmlFor="username" className="label">Username</label>
          <input type="text" name="username" id="username" className="input" placeholder="username123" required />
        </div>
        <div className="mt-5">
          <label htmlFor="password" className="label">Password</label>
          <input type="password" name="password" id="password" className="input" placeholder='********' required />
        </div>
        <div className="mt-5 flex items-baseline justify-between">
          <input type='submit' value='Log In'
          className="cursor-pointer px-6 py-2 mt-2 text-white bg-main-color-500 rounded-lg hover:bg-main-color-900" />
          <a href="/signup" className="text-sm text-main-color-500 hover:underline">Sign Up</a>
        </div>
      </form>

    </div>
  )
}
