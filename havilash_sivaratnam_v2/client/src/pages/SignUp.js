import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { readForm } from '../functions'


export default function SignUp() {
  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const formRef = useRef(null);

  async function handleSubmit(){
    const formData = readForm(formRef.current);

    const rawResponse = await fetch('http://localhost:5000/api/auth/signup', {
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
      window.location.href = "login";
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

      <form ref={formRef} onSubmit={handleSubmit} action='javascript:void(0);' className='form'>
        
        {renderMessage()}
        
        <div className='mt-5'>
          <label htmlFor="username" className="label">Username</label>
          <input type="text" name="username" id="username" className="input" placeholder="username123" required />
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
          className="cursor-pointer px-6 py-2 mt-2 text-white bg-main-color-500 rounded-lg hover:bg-main-color-900" />
          <Link to="/login" className="text-sm text-main-color-500 hover:underline">Log in</Link>
        </div>
      </form>

    </div>
  )
}
