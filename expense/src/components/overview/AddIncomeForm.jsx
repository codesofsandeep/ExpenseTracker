

import React, { useState } from 'react';
import EmojiPickerPopup from '../../components/layouts/EmojiPickerPopup';


const AddIncomeForm = ({ onAddIncome }) => {
    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: ""
    });

    const handleChange = (key, value) => {
        setIncome(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="space-y-5 p-4 rounded-xl bg-white shadow-lg">

        <EmojiPickerPopup 
        icon = {income.icon}
        onSelect = {(selectedIcon) => handleChange("icon" , selectedIcon)}
        />

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Income Source
                </label>
                <input
                    value={income.source}
                    onChange={({ target }) => handleChange("source", target.value)}
                    placeholder="Salary, Freelance, Bonus, etc."
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                </label>
                <input
                    value={income.amount}
                    onChange={({ target }) => handleChange("amount", target.value)}
                    placeholder="Enter amount"
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                </label>
                <input
                    value={income.date}
                    onChange={({ target }) => handleChange("date", target.value)}
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="button"
                    onClick={() => onAddIncome(income)}
                    className=" cursor-pointer  relative group inline-flex items-center justify-center px-6 py-2 font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-md transition-all duration-300 ease-in-out 
                    hover:scale-105 hover:shadow-xl hover:from-purple-700 hover:to-indigo-700 focus:outline-none overflow-hidden"
                >
                    <span className="absolute inset-0 transition-opacity bg-white opacity-0 group-hover:opacity-5"></span>
                    <span className="z-10">Add Income</span>
                </button>
            </div>
        </div>
    );
};

export default AddIncomeForm;
