import React from 'react'
import { assets } from '../../assets/assets'
import Image from 'next/image'
import { useAppContext } from '@/context/AppContext'

const Navbar = () => {

  const { router } = useAppContext()

  return (
    <div className='flex items-center px-4 md:px-8 py-3 justify-between border-b'>
      {/* <Image onClick={() => router.push('/')} className='w-28 lg:w-32 cursor-pointer' src={assets.Icon} alt="" /> */}
      <Image
        // className="cursor-pointer w-28 md:w-40"
        className="cursor-pointer w-[53px] md:w-[190px]"

        onClick={() => router.push('/')}
        src={assets.Icon}
        alt="logo"
      />
      <button className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar