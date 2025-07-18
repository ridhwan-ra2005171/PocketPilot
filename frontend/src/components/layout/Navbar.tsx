import { useState, useEffect } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { FiMoon, FiSun } from 'react-icons/fi';
import SideMenu from './SideMenu';

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Toggle dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <div className='flex items-center justify-between bg-white  border border-b border-gray-200/50  backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30'>

            <div className='flex items-center gap-5'>
                <button
                    className='block lg:hidden text-black cursor-pointer'
                    onClick={() => setOpenSideMenu(!openSideMenu)}>
                    {openSideMenu ? (
                        <HiOutlineX className='text-2xl' />
                    ) : (
                        <HiOutlineMenu className='text-2xl' />
                    )}
                </button>
                <h2 className='text-3xl font-semibold text-primary drop-shadow-md dark:text-primary'>Pocket Pilot</h2>
            </div>

            <button
                onClick={toggleDarkMode}
                className='text-xl text-gray-700  hover:text-primary transition cursor-pointer'>
                {isDarkMode ? <FiSun /> : <FiMoon />}
            </button>

            {openSideMenu && (
                <div className='fixed top-[61px] -ml-4 bg-white '>
                    <SideMenu activeMenu={activeMenu} />
                </div>
            )}
        </div>
    );
};

export default Navbar;
