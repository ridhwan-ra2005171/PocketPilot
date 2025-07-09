// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/input';
// ts-ignore
import { validateEmail } from '../../utils/helper.js';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector.js';
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths.js';
import { UserContext } from '../../context/userContext.js';
import uploadImage from '../../utils/uploadImage.js';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const { updateUser } = useContext(UserContext);


  const navigate = useNavigate();

  //handle Signup form:
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError('Please enter your full name.');
      return;
    }

    if (!password) {
      setError('Please enter a password.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');

    //Sign up API calls
    try {

      //upload profile image (nullable)
      if (profilePic) {
        const imgUploadResponse = await uploadImage(profilePic);
        profileImageUrl = imgUploadResponse.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, {
        fullName,
        email,
        password,
        profileImageUrl
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  }

  return (
    <AuthLayout>
      <div className="mt-12 flex flex-col items-center">
        <h1 className="text-2xl xl:text-2xl font-extrabold ">Create an Account</h1>
        <div className="w-full flex-1 mt-8">
          <div className="flex flex-col items-center">
          </div>



          {/* Email/password form */}
          <div className="mx-auto max-w-xs">
            <form onSubmit={handleSignUp}>

              <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>


                <div className='col-span-2'>
                  <Input type="text" label="Full Name" placeholder="Enter your full name" value={fullName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                  />
                  <Input
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} label='Email Address'
                    placeholder='Enter your email'
                    type='text'
                  />
                  <Input
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    label='Password'
                    placeholder='Enter your password'
                    type='password'
                  />
                </div>

              </div>

              {error && <p className='text-red-500 text-xs mt-2'>{error}</p>}
              <button type='submit' className='btn-primary cursor-pointer'>Sign Up</button>

              <p className='mt-4'>Already have an account? <span className='text-primary underline cursor-pointer' onClick={() => navigate('/login')}>Log In</span></p>
            </form>
            <p className="mt-6 text-xs text-gray-600 text-center">
              I agree to abide by Ridhwan Athaullah's{" "}
              <a href="#" className="border-b border-gray-500 border-dotted">Terms of Service</a> and its{" "}
              <a href="#" className="border-b border-gray-500 border-dotted">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SignUp

