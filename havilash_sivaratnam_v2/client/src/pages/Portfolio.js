import React, { useEffect, useRef, useState } from 'react'
import { FaDownload } from 'react-icons/fa'
import Block from '../components/Block'
import { useNavigate } from "react-router-dom";
import { authFetch, logout } from '../functions';
import { render } from '@testing-library/react';

export default function Portfolio() {
  const navigate = useNavigate();
  const [isAccessible, setIsAccessible] = useState(false);

  useEffect(() => async () => {
    const rawResponse = await authFetch('/api/auth/user', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });

    if (!rawResponse.ok) {
      await logout()
      navigate("/login")
    } else {
      setIsAccessible(true)
    }
  }, [])

  function renderContent() {
    if (!isAccessible)
      return;

    return (
      <Block title="Portfolio" openClose={true} allwaysOpen={true}
      className="flex flex-col justify-center items-center">
        <div className='flex flex-col'>
          <a className='button text-xl mt-4 text-center' href='../media/cv.docx' download="">
            Download CV&emsp;<FaDownload className='inline-block'/>
          </a>
          <a className='button text-xl mt-4 text-center' href='../media/cv.docx' download="">
            Download Zeugnis&emsp;<FaDownload className='inline-block'/>
          </a>
        </div>
      </Block>
    )
  }

  return (
    <div className='container flex justify-center items-center'>
        {/* Portfolio */}
        {renderContent()}
    </div>
  )
}
