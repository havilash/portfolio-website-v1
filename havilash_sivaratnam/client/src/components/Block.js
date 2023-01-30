import React, { useEffect, useRef, useState } from 'react'
import { FaAngleUp } from 'react-icons/fa'

export default function Block({children, className, title, defaultOpenCloseState=false, openCloseAble=false}) {
  const [isOpen, setIsOpen] = useState(defaultOpenCloseState);
  const openCloseIconRef = useRef(null);
  const contentDivRef = useRef(null);

  useEffect(() => {
    isOpen ? openCloseIconRef.current.classList.remove("rotate-180") : openCloseIconRef.current.classList.add("rotate-180");
    isOpen ? contentDivRef.current.classList.remove("hidden") : contentDivRef.current.classList.add("hidden");
  }, [isOpen])

  function handleClick() {
    if (openCloseAble)
      setIsOpen(!isOpen);
  }

  function renderOpenCloseIcon() {
    if (openCloseAble)
      return <FaAngleUp className='cursor-pointer hover:text-main-color-300' />
  }
        
  return (
    <div className={"shadow-lg rounded-lg dark:shadow-xl " + className}>
      <div className='w-full h-16 p-4 shadow-md flex items-center justify-between select-none' onClick={handleClick}>
        <h1>{title}</h1>
        <h1 ref={openCloseIconRef} className='transition-all duration-100'>
          {renderOpenCloseIcon()}
        </h1>
      </div>
      <div ref={contentDivRef} className='px-10 pb-12 mt-4 transition-all'>
        {children}
      </div>
    </div>
  )
}
