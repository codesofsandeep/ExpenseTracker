import React from "react";
import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi";

const AuthLayouts = ({ children }) => {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-300 to-indigo-300 relative overflow-hidden">
            {/* Top Heading - Full Width */}
            <div className="absolute top-0 w-full flex justify-between items-center px-9 py-3 bg-white h-14 shadow-md rounded-b-xl">
                <h2 className="font-semibold text-lg text-left">Expense Tracker</h2>

                {/* Modern Home Button on the Right */}
                <Link
                    to="/"
                    className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:text-white transition-all duration-300 ease-in-out transform "
                >
                    <HiHome className="mr-2 text-lg" />
                    Home
                </Link>
            </div>

            {/* Rendering child components inside AuthLayouts */}
            <div className="mt-20 w-full max-w-md p-6 sm:p-8">
                {children}
            </div>
        </div>
    );
};

export default AuthLayouts;
