import { useState, useEffect } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { FiMoon, FiSun } from 'react-icons/fi';
import SideMenu from './SideMenu';

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || 'light');

    // Toggle dark mode
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    useEffect(() => {
        // Add or remove dark mode class on <html> tag
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        // Store user preference in localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

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

            <div className="relative group">
                <button
                    onClick={toggleTheme}
                    className="text-xl text-gray-700 hover:text-primary transition cursor-pointer"
                >
                    {theme === 'dark' ? <FiSun /> : <FiMoon />}
                </button>
            </div>

            {openSideMenu && (
                <div className='fixed top-[61px] -ml-4 bg-white '>
                    <SideMenu activeMenu={activeMenu} />
                </div>
            )}
        </div>
    );
};

export default Navbar;
