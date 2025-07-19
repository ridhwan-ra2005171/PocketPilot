import React, { useContext } from 'react'
import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2 } from 'react-icons/lu'
import { UserContext } from '../../context/userContext';
import { getCurrencySymbol } from '../../utils/helper';

interface User {
    currency: string
}
interface UserContextType {
    user: User | null;
}

const TransactionInfoCard = ({ icon, title, date, amount, type, hideDeleteBtn, onDelete }) => {
    const {user} = useContext(UserContext) as UserContextType;
    const getAmountStyles = () =>  type === 'income' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500';
    const currencySymbol = getCurrencySymbol(user?.currency || "USD");

    return (
        <div className='group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-blue-100/60'>
            <div className='w-12 h-12 flex items-center justify-center text-gray-800 bg-gray-100 rounded-full'>
                {
                    icon ? (
                        <img src={icon} alt={title} className='w-6 h-6' />
                    ) : (
                        <LuUtensils />
                    )
                }
            </div>

            <div className='flex-1 flex items-center justify-between'>
                <div>
                    <p className='text-sm  font-medium'>{title}</p>
                    <p className='text-xs mt-1 sub'>{date}</p>

                </div>
            </div>
            <div className='flex items-center gap-2'>
                {!hideDeleteBtn &&(
                    <button className=' hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer' onClick={onDelete}>
                        <LuTrash2 size={18}/>
                    </button>
                )}

                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
                    <h6 className='text-xs font-semibold'>
                        {type === "income"? "+": "-"} {currencySymbol +amount}
                    </h6>
                    {type === "income"? <LuTrendingUp /> : <LuTrendingDown />}
                </div>
            </div>
        </div>
    )
}

export default TransactionInfoCard