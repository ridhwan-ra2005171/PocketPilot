import React from 'react'

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className='card flex gap-6  p-6 rounded-2xl shadow-md  border'>
      <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
        {icon}
      </div>
      <div>
        <h6 className='text-sm text-gray-500 mb-1 font-semibold'>{label}</h6>
        <span className={`text-[22px] ${String(value).includes('-') ? 'text-red-500' : ''}`}>
          {value}
        </span>
      </div>
    </div>
  )
}


export default InfoCard