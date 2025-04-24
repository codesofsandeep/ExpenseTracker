import React from 'react';

const CustomLegend = ({ payload }) => {
    if (!payload || payload.length === 0) return null;

    return (
        <div className='flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4'>
            {payload.map((entry, index) => (
                <div className='flex items-center space-x-2' key={`legend-${index}`}>
                    <div
                        className='w-2.5 h-2.5 rounded-full'
                        style={{ backgroundColor: entry.color }}
                    />
                    <span className='text-xs text-gray-700 font-medium'>{entry.value}</span>
                </div>
            ))}
        </div>
    );
};

export default CustomLegend;
