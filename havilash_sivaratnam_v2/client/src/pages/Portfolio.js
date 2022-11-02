import React, { useEffect, useRef, useState } from 'react'
import { FaDownload } from 'react-icons/fa'
import Block from '../components/Block'
import { useNavigate } from "react-router-dom";
import { authFetch, logout } from '../functions';
import packageData from '../../package.json'


export default function Portfolio() {
  const navigate = useNavigate();
  const [isAccessible, setIsAccessible] = useState(false);

  useEffect(() => { 
    async function func() {
      const rawResponse = await authFetch(packageData.proxy + '/api/auth/user', {
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
    }

    func();
  }, [])

  function renderContent() {
    if (!isAccessible)
      return;

    return (
      <Block title="Portfolio" defaultOpenCloseState={true} openCloseAble={true}
      className="flex flex-col justify-center items-center">
        <div className='flex flex-col'>
          <a className='button text-xl mt-4 text-center' href='../media/cv.pdf' download="">
            Download CV&emsp;<FaDownload className='inline-block'/>
          </a>
          <a className='button text-xl mt-4 text-center' href='../media/reportcard.pdf' download="">
            Download Report Card&emsp;<FaDownload className='inline-block'/>
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
