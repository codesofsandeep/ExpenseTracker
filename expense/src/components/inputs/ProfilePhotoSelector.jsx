import React, { useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

function ProfilePhotoSelector({ image, setImage }) {
    const inputRef = useRef(null);
    const [previewURL, setPreviewURL] = useState(null);
    const [error, setError] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Corrected file access

        if (file) {
            // Validate file type
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                setError('Please upload a valid image (JPEG, PNG, or GIF).');
                return;
            }

            // Clear previous error
            setError('');

            // Update image state
            setImage(file);

            // Generate preview of the file
            const preview = URL.createObjectURL(file);
            setPreviewURL(preview);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewURL(null);
        console.log("Profile pic removed");
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    return (
        <div className="flex flex-col items-center justify-center mb-5 -mt-3-">
            <input 
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />
            
            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            {!image ? (
                <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
                    <LuUser className="text-gray-500 text-3xl" />
                    <button 
                        type="button" 
                        className="absolute bottom-0 right-0 bg-purple-500 text-white p-1 rounded-full"
                        onClick={onChooseFile}
                    > 
                        <LuUpload className="text-xl" />
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <img src={previewURL} alt="Profile Photo" className="w-20 h-20 rounded-full object-cover" />
                    <button 
                        type="button" 
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                        onClick={handleRemoveImage}
                    >
                        <LuTrash className="text-xl" /> 
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProfilePhotoSelector;
