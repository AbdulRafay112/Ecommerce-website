import React from 'react'
import Image from 'next/image'
const Trusted = () => {
  return (
    <div className='h-[200px] bg-slate-100 flex flex-col items-center justify-center gap-5 mt-8'>
        <div className='font-bold'>Trusted by 1000+ Companies</div>
        <div className='flex items-center gap-4'>
            <div><Image src={'/logo-1.png'} alt='image' width={100} height={100}></Image></div>
            <div><Image src={'/logo-2.jpeg'} alt='image' width={100} height={100}></Image></div>
            <div><Image src={'/logo-3.jpeg'} alt='image' width={100} height={100}></Image></div>
            <div><Image src={'/logo-4.png'} alt='image' width={100} height={100}></Image></div>
            <div><Image src={'/logo-5.jpeg'} alt='image' width={100} height={100}></Image></div>
        </div>
    
    </div>
  )
}

export default Trusted
