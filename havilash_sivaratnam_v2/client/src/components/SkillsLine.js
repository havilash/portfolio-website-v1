import React, { useEffect, useRef, useState } from 'react'

export default function SkillsLine({ name, percent }) {

  return (
    <div className='mt-6 w-full'>
        <h3>{name}</h3>
        <div className='w-full relative'>
          <div className='absolute top-0 left-0
          border-solid border-text-color-500 border-4 w-full'></div>
          <div className={`absolute top-0 left-0 border-solid border-main-color-500 border-4`} style={{width: percent+'%'}}></div>
        </div>
    </div>
  )
}
