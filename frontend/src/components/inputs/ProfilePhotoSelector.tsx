import React, { useRef, useState, useEffect } from 'react'
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu'
import axiosInstance from '../../utils/axiosInstance';

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!image) {
            setPreviewUrl(null);
        } else if (typeof image === 'string') {
            setPreviewUrl(image);
        } else if (image instanceof File) {
            const preview = URL.createObjectURL(image);
            setPreviewUrl(preview);
            // Clean up the object URL when component unmounts or image changes
            return () => URL.revokeObjectURL(preview);
        }
    }, [image]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
        }
    }

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
        
    }

    const onChooseFile = () => inputRef.current?.click();

    return (
        <div className='flex justify-center mb-6'>
            <input
                type='file'
                accept='image/*'
                ref={inputRef}
                onChange={handleImageChange}
                className='hidden'
            />

            {!image || image === String ? (
                <div className='w-20 h-20 flex items-center justify-center bg-blue-50 rounded-full relative'>
                    <LuUser className='text-4xl text-primary' />

                    <button
                        type='button'
                        className='w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
                        onClick={onChooseFile}
                    >
                        <LuUpload/>
                    </button>

                </div>

            ) : (
                <div className='relative'>
                    <img src={previewUrl || undefined} alt="profile" className='w-20 h-20 rounded-full object-cover' />

                    <button
                        type='button'
                        className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
                        onClick={handleRemoveImage}
                    >
                        <LuTrash/>
                    </button>

                </div>

            )}


        </div>
    )
}

export default ProfilePhotoSelector