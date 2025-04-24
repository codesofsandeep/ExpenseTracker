import React from 'react'

const InfoCard = ({ icon, label, value, color }) => {
    return (
        <div className="p-[1px] rounded-2xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-md">
            <div className='flex gap-6 bg-white p-6 rounded-2xl shadow-gray-100'>
                <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
                    {icon}
                </div>

                {/* Group label and value vertically */}
                <div className="flex flex-col justify-center">
                    <h6 className='text-sm text-gray-500'>{label}</h6>
                    <span className='text-[22px] font-semibold text-gray-900'>${value}</span>
                </div>
            </div>
        </div>

    )
}

export default InfoCard
