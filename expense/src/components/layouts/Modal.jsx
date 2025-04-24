import React from 'react';
import { IoClose } from "react-icons/io5";

const Modal = ({ children, isOpen, onClose, title }) => {

    if(!isOpen) return null;

    return (
        <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black/30'>
            <div className='bg-white dark:bg-gray-700 rounded-lg shadow-md w-full max-w-2xl mx-4'>
                
                {/* Modal Header */}
                <div className='flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600'>
                    <h5 className='text-lg font-medium text-gray-900 dark:text-white'>
                        {title}
                    </h5>
                    <button
                        onClick={onClose}
                        className='text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg p-1 transition'
                    >
                        <IoClose size={20} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className='p-4 max-h-[70vh] overflow-y-auto'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;