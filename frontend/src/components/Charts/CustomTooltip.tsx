// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useContext } from 'react'
import { getCurrencySymbol } from '../../utils/helper';
import { UserContext } from '../../context/userContext';
interface User {
  currency: string
}
interface UserContextType {
  user: User | null;
}
const CustomTooltip = ({ active, payload }) => {
  const { user } = useContext(UserContext) as UserContextType;
  const currencySymbol = getCurrencySymbol(user?.currency || "USD");

  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
        <p className="text-xs font-semibold text-primary mb-1">{payload[0].payload.name}</p>
        <p className='text-sm text-gray-600'>
          Amount: <span className='text-sm font-medium text-gray-900'>{currencySymbol}{payload[0].value}</span>
        </p>
      </div>
    )
  }
  return null
}

export default CustomTooltip