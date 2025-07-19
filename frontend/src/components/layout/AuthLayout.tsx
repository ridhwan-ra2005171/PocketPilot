import React, { useState } from 'react'
import AUTHIMG from '../../assets/images/authlayout.png'
import DARK_AUTHIMG from '../../assets/images/authlayoutdark.png'
import LOGO from '../../assets/images/logo.png'
import { LuTrendingUpDown } from 'react-icons/lu'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || 'light');

  return (
    <div className="authLayout min-h-screen flex justify-center">
      <div className="authLayoutLeft max-w-screen-xl m-0 sm:m-10 shadow sm:rounded-lg flex justify-center flex-1">

        {/* LEFT SIDE: Logo + page content */}
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          {/* Logo */}
          <div>
            <img
              src={LOGO}
              className="w-50 mx-auto"
              alt="Logo"
            />
          </div>


          {/* Page-specific content (like SignUp) */}
          {children}
        </div>

        {/* RIGHT SIDE: Illustration */}
        <div className="flex-1 authLayoutRight text-center hidden lg:flex">
          <div
            className="m-4 xl:m-8 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${theme === 'dark' ? DARK_AUTHIMG : AUTHIMG})`,
            }}
          ></div>

        </div>
      </div>
    </div>

  )
}

export default AuthLayout

const StatsInfoCard = ({ icon, label, value, color }: any) => {
  return (
    <div className='flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-10'>
      <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
        {icon}
      </div>
      <div>
        <h6 className='text-xs text-gray-500 mb-1'>{label}</h6>
        <span className='text-[20px]'>${value}</span>
      </div>

    </div>
  )
}


