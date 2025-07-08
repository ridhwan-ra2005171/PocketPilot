import React from 'react'
import CARD_2 from '../../assets/images/card2.png'
import {LuTrendingUpDown} from 'react-icons/lu'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex'>
            <div className='v-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl text-primary drop-shadow-md"><LuTrendingUpDown /></span>
                    <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-700 via-sky-700 to-cyan-700 bg-clip-text text-transparent tracking-wide drop-shadow-lg select-none">Pocket Pilot</h2>
                </div>
                <p className="text-base italic text-gray-400 tracking-wide mb-6 pl-1 select-none">Your Personal Finance Assistant</p>
                {children}
            </div>

            <div
                className='hidden md:block w-[40vw] h-screen bg-violet-50 bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative'
                style={{ backgroundImage: `url(${CARD_2})` }}
            >
                {/* <div className='w-48 h-48 rounded-[40px] bg-primary absolute -top-7 -left-5' />
                <div className='w-48 h-48 rounded-[40px] border-[20px] border-blue-600/50 absolute top-[30%] -right-10' />
                <div className='w-48 h-48 rounded-[40px] bg-primary/50 absolute -bottom-7 -left-5' /> */}

                <div className='grid grid-cols-1 z-20'>
                    <StatsInfoCard
                        icon={<LuTrendingUpDown />}
                        label='Track Your Income & Expenses'
                        value="408,465"
                        color="bg-primary"
                    />

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