import React, { useEffect, useReducer, useRef, useState } from 'react'
import { FaAngleLeft } from 'react-icons/fa'
import { HuePicker } from 'react-color'
import '../index.css'

export default function ColorPalette({ className }) {

    const [isOpen, setIsOpen] = useState(true)
    const colorPalleteRef = useRef(null)
    const openCloseIconRef = useRef(null)
    

    useEffect(() => {
        isOpen ? colorPalleteRef.current.classList.remove("translate-x-[calc(100%_-_2.5rem)]") : colorPalleteRef.current.classList.add("translate-x-[calc(100%_-_2.5rem)]");
        isOpen ? openCloseIconRef.current.classList.add("rotate-180") : openCloseIconRef.current.classList.remove("rotate-180");
    }, [isOpen])

    function changeColor(color){
        document.documentElement.style.setProperty('--hue-color', color)
    }

  return (
    <div ref={colorPalleteRef} className={'fixed flex flex-row top-12 right-0 transition-all ' + className}>
        <div className='colors rounded-l-md w-10 h-fit mt-8'>
            <div ref={openCloseIconRef} className='w-full h-full transition-all rotate-180'> 
                <FaAngleLeft className='cursor-pointer text-4xl hover:text-main-color-300' onClick={() => setIsOpen(!isOpen)}/>
            </div>
        </div>
        <div className='colors rounded-md p-2
        flex flex-row justify-center items-center h-64'> 
            <div className='w-full h-full flex flex-col justify-center items-center sm:mr-4'>
                <div className={`bg-[hsl(340,_69%,_61%)] color`} onClick={() => changeColor(340)}/>
                <div className={`bg-[hsl(280,_69%,_61%)] color`} onClick={() => changeColor(280)}/>
                <div className={`bg-[hsl(230,_69%,_61%)] color`} onClick={() => changeColor(230)}/>
                <div className={`bg-[hsl(142,_69%,_61%)] color`} onClick={() => changeColor(142)}/>
                <div className={`bg-[hsl(60,_69%,_61%)] color`} onClick={() => changeColor(60)}/>
                <div className={`bg-[hsl(0,_69%,_61%)] color`} onClick={() => changeColor(0)}/>
            </div>
            <HuePicker className='hidden sm:block'
            height='100%' width='1.2rem' direction="vertical"
            color={230}
            onChange={(c, e) => changeColor(Math.round(c.hsl.h))}/>
        </div>
    </div>
  )
}

  