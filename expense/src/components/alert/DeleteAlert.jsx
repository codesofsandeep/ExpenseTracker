import React from 'react'

const DeleteAlert = ({ content, onDelete }) => {
    return (
        <div className=' '>
            <p className=' text-sm'> {content} </p>
            <div className=' flex justify-end mt-6'>
                <button
                    type="button"
                    onClick={onDelete}
                    className="px-4 py-1.5 text-sm font-medium text-white bg-red-500 rounded-full shadow-sm 
                        hover:bg-red-600 hover:scale-105 transition-all duration-200 ease-in-out"
                >
                    Delete
                </button>

            </div>
        </div>
    )
}

export default DeleteAlert
