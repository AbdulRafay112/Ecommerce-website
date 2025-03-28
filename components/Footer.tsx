import React from 'react'
const Footer = () => {
  return (
    <div>
      <footer className='min-h-[350px] bg-slate-700 text-white flex flex-col items-center justify-center gap-9 mt-9'>
        <div className='flex justify-center gap-8 flex-wrap'>
            <div className='flex flex-col gap-3'>
                <div>Rafay Ecommerce</div>
                <div className='min-w-[250px] max-w-[350px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. </div>
            </div>
            <div className='flex flex-col gap-3'>
                <div>subscribe to get important updates</div>
                <input type="email" placeholder='your email' className='bg-white px-4 py-3' />
                <button className='bg-blue-600 px-4 py-2 rounded-md'>Subscribe</button>
            </div>
            <div className='flex flex-col gap-3'>
                <div>Follow Us</div>
            </div>
            <div className='flex flex-col gap-3'>
                <div>Call Us</div>
                <div>+924576859876</div>
            </div>
        </div>
        <hr className='border-w w-full'/>
        <div className='flex gap-7 flex-wrap justify-center'>
            <div className='text-center'><p>&copy; 2023 Rafay Ecommerce. All rights reserved.</p></div>
            <div className='flex flex-col gap-2'>
                <div>Privacy Policy</div>
                <div>Terms & Condition</div>
            </div>
        </div>
        
      </footer>
    </div>
  )
}

export default Footer
