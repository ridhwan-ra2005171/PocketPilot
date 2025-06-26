import React, { useState } from 'react'
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa'

const Input = ({value, onChange, label, placeholder, type}) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div>
        <label className='text-[13px] text-slate-800'>{label}</label>

        <div className='input-box'>
            <input 
            type={type === 'password' ? showPassword ? 'text' : 'password' : type} 
            placeholder={placeholder}
            value={value}
            className='w-full bg-transparent outline-none border-none placeholder:text-slate-400'
            onChange={(e) => onChange(e)}
            />

            {type === 'password' && (
                <span onClick={toggleShowPassword} className='text-primary cursor-pointer'>
                    {showPassword ? <FaRegEye size={22} className='text-primary cursor-pointer'/> : <FaRegEyeSlash  size={22} className='text-slate-400 cursor-pointer'/>}
                </span>
            )}

        </div>
    </div>
  )
}

export default Input