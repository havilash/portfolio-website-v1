import React from 'react'
import { ReactComponent as BlobSVG } from '../media/blob.svg'

export default function AboutMe() {
  return (
    <div className='container flex justify-center items-center'>
        {/* AboutMe */}
        <div className='content h-full
        grid grid-rows-2 grid-cols-1 gap-4 lg:grid-rows-1 lg:grid-cols-2 lg:gap-24
        items-center'>
          <div className='h-full w-full
          lg:flex lg:flex-col lg:justify-center'>
            <h1>Havilash Sivaratnam</h1>
            <p>
              Veniam cillum nostrud reprehenderit exercitation occaecat aliquip dolor cillum. Dolor ex nulla laboris ipsum et. Ex anim ad dolore id culpa aliqua consectetur. Labore proident sunt sunt amet. Labore duis velit quis est tempor minim mollit pariatur tempor aliqua esse sint ullamco. Eu eu fugiat id tempor dolore ad nulla sit.
            </p>
          </div>
          <div className='w-full h-full
          flex justify-center items-center 
          row-start-1 lg:col-start-1 gap-8'>
            <BlobSVG className="fill-main-color-500 h-[60%] lg:h-[40%]"/>
          </div>
        </div>
    </div>
  )
}
