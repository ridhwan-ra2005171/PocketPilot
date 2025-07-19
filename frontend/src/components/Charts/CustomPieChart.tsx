// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useContext } from 'react'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';
import { UserContext } from '../../context/userContext';
import { getCurrencySymbol } from '../../utils/helper';

interface User {
    currency: string
}
interface UserContextType {
    user: User | null;
}


const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
      const { user } = useContext(UserContext) as UserContextType;
      const currencySymbol = getCurrencySymbol(user?.currency || "USD");
    
    return <ResponsiveContainer  width="100%" height={380}>
        <PieChart>
            <Pie
                data={data}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={130}
                innerRadius={100}
                labelLine={false}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
            </Pie>

            <Tooltip content={CustomTooltip} />
            <Legend content={CustomLegend}/>

                {/* text in middle */}
            {showTextAnchor && (
                <>
                    <text x="50%" y="50%" dy={-25} textAnchor='middle' className="fill-gray-600 dark:fill-gray-600" fontSize="14px" fontWeight={"bold"}>
                        {label}
                    </text>
                    <text x="50%" y="50%" dy={8} textAnchor='middle'  fontSize="24px" fontWeight="semi-bold">
                        {currencySymbol+totalAmount}
                    </text>
                </>
            )}
        </PieChart>
    </ResponsiveContainer>
}

export default CustomPieChart