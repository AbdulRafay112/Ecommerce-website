import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
const page = () => {
  return (
    <>
    <Navbar/>
    <div className='flex flex-col gap-5'>
        <h1 className='text-center text-3xl'>Contact Us</h1>
        <div><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7237.176278726038!2d67.04824338736215!3d24.91202654220055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f0f1e85a303%3A0x8eb0ba0f66c6a795!2sSharifabad%20Block%201%20Gulberg%20Town%2C%20Karachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1740291892157!5m2!1sen!2s" width="100%" height="400" style={{border:0}} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></div>
        <div>
            <form action="https://formspree.io/f/mvgznooz" method='POST' className='flex flex-col items-center justify-center gap-4'>
                <input type="text" placeholder='username' name='username' required autoComplete='off' className='border px-9 py-3' />
                <input type="email" placeholder='email' name='email' required autoComplete='off' className='border px-9 py-3'/>
                <textarea name="message" placeholder='Enter your Message' id="message" autoComplete='off' className='border px-9 py-3'></textarea>
                <button className='bg-blue-700 text-white px-9 py-2'>Send</button>
            </form>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default page
