import React, { useState } from 'react';
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='flex flex-col md:flex-row items-start '>
            {/* Icon Picker Trigger */}
            <div className='flex items-center gap-4 cursor-pointer' onClick={() => setIsOpen(true)}>
                <div className='w-10 h-10 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg'>
                    {icon ? (
                        <img src={icon} alt='icon' className='w-12 h-12 object-contain' />
                    ) : (
                        <LuImage />
                    )}
                </div>
                <p>{icon ? "Change Icon" : "Pick Icon"}</p>
            </div>

            {/* Emoji Picker */}
            <div className='relative'>
                {isOpen && (
                    <div
                        className='relative animate-fadeInScale shadow-lg rounded-lg border border-gray-200 bg-white z-20'
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className='w-7 h-7 flex items-center justify-center bg-white border border-gray-200 
                            absolute -top-2 -right-2 z-10 rounded-full hover:bg-gray-100 transition'
                        >
                            <LuX />
                        </button>

                        <EmojiPicker
                            open={isOpen}
                            onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || emoji?.emoji)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmojiPickerPopup;
