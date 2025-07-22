import React, { useContext, useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector'
import { UserContext } from '../../context/userContext'
import uploadImage from '../../utils/uploadImage'
import Input from '../../components/inputs/input'
import CharAvatar from '../../components/Cards/CharAvatar'
import { API_PATHS } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosInstance'
import toast from 'react-hot-toast'
import { useUserAuth } from '../../hooks/useUserAuth'

// Add User and context types inline
interface User {
    fullName: string;
    email: string;
    profileImage?: string;
    [key: string]: any;
}
interface UserContextType {
    fullName: User | null;
    updateUser: (user: User) => void;
    clearUser: () => void;
}

const Settings = () => {
    useUserAuth();
    const { user, updateUser } = useContext(UserContext) as UserContextType;
    // Local state for form fields
    const [fullName, setfullName] = useState(user?.fullName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [image, setImage] = useState(null); // file object
    const [profileImageUrl, setProfileImageUrl] = useState(user?.profileImageUrl || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    // Currency state
    const currencyOptions = [
        { label: 'Euro (EUR)', value: 'EUR' },
        { label: 'US Dollar (USD)', value: 'USD' },
        { label: 'Qatar Riyal (QAR)', value: 'QAR' },
        { label: 'British Pound (GBP)', value: 'GBP' },
        { label: 'Japanese Yen (JPY)', value: 'JPY' },
        { label: 'Canadian Dollar (CAD)', value: 'CAD' },
        { label: 'Australian Dollar (AUD)', value: 'AUD' },
        { label: 'Indian Rupee (INR)', value: 'INR' },
        // Add more as needed
    ];
    const [currency, setCurrency] = useState(user?.currency || 'USD');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        try {
            let uploadedImageUrl = profileImageUrl;
            if (image) {
                // Upload new image
                const res = await uploadImage(image);
                uploadedImageUrl = res?.imageUrl || uploadedImageUrl;
                setProfileImageUrl(uploadedImageUrl);
            }
            if (password && password !== confirmPassword) {
                setError('Passwords do not match');
                setLoading(false);
                return;
            }
            // TODO: Replace with real API call to update user profile
            await axiosInstance.patch(API_PATHS.AUTH.UPDATE_PROFILE, {
                ...(fullName && { fullName }),
                ...(email && { email }),
                ...(password && { password }),
                ...(profileImageUrl && { profileImageUrl })
            });
            toast.success("Profile updated successfully");

            setSuccess('Profile updated successfully!');
            const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
            updateUser(response.data);
        } catch (err) {
            setError('Failed to update profile.');
            console.log("Failed to update profile. Please try again", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCurrencySave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess('');


        //patch currency API call
        try {
            await axiosInstance.patch(API_PATHS.AUTH.UPDATE_CURRENCY, {
                currency: currency
            });
            toast.success("Currency Changed successfully");
            setSuccess('Profile updated successfully!');
            const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
            updateUser(response.data);
        } catch (error) {
            console.log("Failed to update currency. Please try again", error);
            toast.error("Failed to update currency. Please try again");
        }

    };


    return (
        <DashboardLayout activeMenu={"Settings"}>
            <div className='card mt-5'>
                <div className='mb-6'>
                    <h5 className='text-lg'>Profile Settings</h5>
                    <p className='text-xs text-gray-400 mt-0.5'>Manage your profile settings</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <ProfilePhotoSelector image={image || user?.profileImageUrl} setImage={setImage} />
                    {/* <div className='flex justify-center mb-6'>
                        {user?.profileImageUrl ? (
                            <img
                                src={user?.profileImageUrl || ""}
                                alt='Profile Image'
                                className='w-30 h-30 bg-slate-400 rounded-full'
                            />
                        ) :
                            <CharAvatar
                                fullName={user?.fullName}
                                width="w-20"
                                height="h-20"
                                style="text-2xl"
                            />
                        }
                    </div> */}

                    <label className='block text-sm'>Name</label>
                    <Input
                        type='text'
                        value={fullName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setfullName(e.target.value)}
                        placeholder='Enter your name'
                    />
                    <label className='block text-sm'>Email</label>
                    <Input
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        placeholder='Enter your email'
                        type='text'

                    />
                    <label className='block text-sm'>New Password</label>
                    <Input
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        placeholder='Enter your password'
                        type='password'
                    />
                    <label className='block text-sm'>Confirm New Password</label>
                    <Input
                        value={confirmPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                        placeholder='Enter your password'
                        type='password'
                    />
                    {error && <div className='text-red-500 text-sm mb-2'>{error}</div>}
                    {success && <div className='text-green-600 text-sm mb-2'>{success}</div>}
                    <button
                        type='submit'
                        className='btn btn-primary w-full mt-2 cursor-pointer'
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>
            <div className="card mt-6">
                <div className="mb-6">
                    <h5 className="text-lg">Currency</h5>
                    <p className="text-xs text-gray-400 mt-0.5">Change your default currency</p>
                </div>
                <form onSubmit={handleCurrencySave}>
                    <div className="mb-4">
                        <label className="block text-sm mb-1">Currency</label>
                        <select
                            className="input input-bordered w-full"
                            value={currency}
                            onChange={e => setCurrency(e.target.value)}
                        >
                            {currencyOptions.map(opt => (
                                <option className='text-stone-700' key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full mt-2 cursor-pointer"
                    >
                        Save Currency
                    </button>
                </form>
            </div>
        </DashboardLayout>
    )
}

export default Settings