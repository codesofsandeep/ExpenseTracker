import React from 'react';
import { LuUtensils, LuTrash2, LuTrendingUp, LuTrendingDown } from 'react-icons/lu';

const TransactionInfoCard = ({ title, icon, date, amount, type, hideDeleteBtn, onDelete }) => {
    const handleImageError = (e) => {
        e.target.style.display = 'none';
    };

    const getAmountStyle = () =>
        type === "income" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500"


    return (
        <div className='group relative flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-2 p-4 rounded-lg hover:bg-gray-100/60 transition-all'>
            {/* Icon */}
            <div className='w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full shrink-0'>
                {icon ? (
                    <img
                        src={icon}
                        alt={title}
                        className='w-6 h-6 object-contain'
                        onError={handleImageError}
                    />
                ) : (
                    <LuUtensils />
                )}
            </div>

            {/* Title + Date */}
            <div className='flex-1 w-full sm:w-auto'>
                <h4 className='text-sm font-semibold text-gray-800'>{title || "No Title"}</h4>
                <p className='text-xs text-gray-500'>{date || "No Date"}</p>
            </div>

            {/* Amount + Trend Icon */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ml-auto ${getAmountStyle()}`}>
                <h6 className='text-sm font-semibold '>
                    {type === 'income' ? "+" : "-"} ${amount}
                </h6>
                {type === 'income' ? (
                    <LuTrendingUp />
                ) : (
                    <LuTrendingDown />
                )}
            </div>

            {/* Delete Button */}
            {!hideDeleteBtn && (
                <button
                    onClick={onDelete}
                    className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
                >
                    <LuTrash2 size={18} />
                </button>
            )}
        </div>
    );
};

export default TransactionInfoCard;
