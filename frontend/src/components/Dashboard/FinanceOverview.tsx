// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["#0284c7", "#FA2C37", "#FF6900"];

const FinanceOverview = ({totalBalance,totalExpense, totalIncome}) => {
    const balanceData = [
        { name: "Total Balance", amount: totalBalance },
        { name: "Total Expense", amount: totalExpense },
        { name: "Total Income", amount: totalIncome },
    ]
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Financial Overview</h5>
        </div>

        <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount ={`${totalBalance}`}
        colors={COLORS}
        showTextAnchor
        />
    </div>
  )
}

export default FinanceOverview