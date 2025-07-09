// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import SideMenu from './SideMenu';

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    return (
        <div className='flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30'>
            <button
                className='block lg:hidden text-black cursor-pointer'
                onClick={() => setOpenSideMenu(!openSideMenu)}>
                {openSideMenu ? (
                    <HiOutlineX className='text-2xl' />
                ) : (
                    <HiOutlineMenu className='text-2xl' />
                )}

            </button>
            <h2 className='text-3xl font-semibold text-primary drop-shadow-md'>Pocket Pilot</h2>

            {openSideMenu && (
                <div className='fixed top-[61px] -ml-4 bg-white'>
                    <SideMenu activeMenu={activeMenu} />
                </div>
            )}
        </div>
    )
}

export default Navbar