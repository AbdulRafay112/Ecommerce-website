import React from 'react'
import Image from 'next/image'
const Services = () => {
  return (
    <div className='flex gap-5 items-center justify-center flex-wrap min-h-[400px] mt-8'>
        <div className="box1 w-[250px] h-[200px] bg-slate-100 rounded-lg flex flex-col gap-3 items-center justify-center px-4">
            <Image src={'/truck.jpeg'} alt='image' width={50} height={50} className='rounded-full'></Image>
            <div>Super fast and free delivery</div>
        </div>
        <div className="box2 w-[250px] h-[200px] flex flex-col justify-between">
            <div className='h-[70px] bg-slate-100 w-[250px] rounded-lg flex items-center gap-2 px-3'>
                <div><Image src={'/non-contact.jpeg'} alt='image' width={50} height={50}></Image></div>
                <div>Non-contact Shipping</div>
            </div>
            <div className='h-[70px] bg-slate-100 w-[250px] rounded-lg flex items-center gap-2 px-3'>
                <div><Image src={'/money-back.jpeg'} alt='image' width={50} height={50}></Image></div>
                <div>Money Back Guarenteed</div>

            </div>
        </div>
        <div className="box3 w-[250px] h-[200px] bg-slate-100 rounded-lg flex flex-col gap-3 items-center justify-center px-4">
            <Image src={'/secure.jpeg'} alt='image' width={50} height={50} className='rounded-full'></Image>
            <div>Super Secure Payment System</div>
        </div>
      
    </div>
  )
}

export default Services
