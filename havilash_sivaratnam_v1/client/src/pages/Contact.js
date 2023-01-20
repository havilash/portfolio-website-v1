import React, { useRef } from 'react'
import { readForm } from '../functions';

export default function Contact() {

    const mailto = 'test@example.com'

    const formRef = useRef(null)

    function handleSubmit() {
        const formData = readForm(formRef.current);
        window.open(`mailto:${mailto}?subject=${formData.subject}&body=${formData.message}`);
    }

  return (
    <div className='container flex justify-center items-center'>
        {/* Contact */}

        <form ref={formRef} onSubmit={handleSubmit} action='javascript:void(0);' className='form max-w-lg'>
            <div className='mt-5'>
                <label htmlFor="email" className="label">E-Mail</label>
                <input type="text" name="email" id="email" className="input" placeholder="you@example.com" required />
            </div>
            <div className='mt-5'>
                <label htmlFor="subject" className="label">Subject</label>
                <input type="text" name="subject" id="subject" className="input" placeholder="example" required />
            </div>
            <div className="mt-5">
                <label htmlFor="message" className="label">Message</label>
                <textarea rows="8" name="message" id="message" className="input" placeholder='' required />
            </div>
            <div className="mt-5 flex items-baseline justify-between">
                <input type='submit' value='Send'
                className="cursor-pointer px-6 py-2 mt-2 text-white bg-main-color-500 rounded-lg hover:bg-main-color-900" />
            </div>
        </form>

    </div>
  )
}
