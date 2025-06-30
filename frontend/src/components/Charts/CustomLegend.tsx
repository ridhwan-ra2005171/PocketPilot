// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react'

//payload is a prop that Recharts passes to the custom legend component.
//Each item in payload represents a legend item (e.g., a category or data key).
const CustomLegend = ({payload}) => {
  return (
    <div className='flex flex-wrap justify-center gap-2 mt-6 space-x-7'>
        {payload.map((entry, index) => (
            <div key={`legend-${index}`}className='flex items-center space-x-2'>
                <div className='w-2.5 h-2.5 rounded-full' style={{ backgroundColor: entry.color }}></div>
                <span className='text-xs text-gray-700 font-medium'>{entry.value}</span>
            </div>
        ))}
    </div>
  )
}

export default CustomLegend