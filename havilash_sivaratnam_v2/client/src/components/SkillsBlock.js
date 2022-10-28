import React, { useEffect, useRef, useState } from 'react'
import { FaAngleUp } from 'react-icons/fa'

export default function SkillsBlock({className, title, skills, openClose=false}) {
  const [isOpen, setIsOpen] = useState(openClose);
  const openCloseIconRef = useRef(null);
  const skillsDivRef = useRef(null);

  useEffect(() => {
    isOpen ? openCloseIconRef.current.classList.remove("rotate-180") : openCloseIconRef.current.classList.add("rotate-180");
    isOpen ? skillsDivRef.current.classList.remove("hidden") : skillsDivRef.current.classList.add("hidden");
  }, [isOpen])

  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <div className={className + " shadow-lg rounded-lg"}>
      <div className='w-full h-16 p-4 shadow-md flex items-center justify-between select-none' onClick={handleClick}>
        <h1>{title}</h1>
        <h1 ref={openCloseIconRef} className='cursor-pointer transition-all duration-100 p-2 hover:text-main-color-300'
        ><FaAngleUp /></h1>
      </div>
      <div ref={skillsDivRef} className='px-10 pb-12 transition-all'>
        {skills}
      </div>
    </div>
  )
}
