import React from 'react'
import { FaDownload } from 'react-icons/fa'

export default function Portfolio() {
  return (
    <div className='container flex justify-center items-center'>
        {/* Portfolio */}
        <a className='button text-xl' href='../media/cv.docx' download="">
          Download CV&emsp;<FaDownload className='inline-block'/>
        </a>
    </div>
  )
}
