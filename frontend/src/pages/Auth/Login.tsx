// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/input';
// ts-ignore
import { validateEmail } from '../../utils/helper.js';
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths.js';
import { UserContext } from '../../context/userContext.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();


  //handle Login form:
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError('All fields are required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Enter a valid email address');
      return;
    }

    setError('');

    //Login API calls
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  }

  return (
    <AuthLayout>
      <div className='mt-30 flex flex-col items-center'>
        <h3 className='text-2xl xl:text-2xl font-extrabold'>Welcome Back</h3>
        <p className='text-s text-slate700 mt-[5px] mb-6'>Please Enter login Credentials</p>
        <div className='w-full flex-1'>
          <form onSubmit={handleLogin}>
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

            {error && <p className='text-red-500 text-xs mt-2'>{error}</p>}
            <button type='submit' className='btn-primary cursor-pointer'>Login</button>

            <p className='mt-4'>Don't have an account? <span className='text-primary underline cursor-pointer' onClick={() => navigate('/signup')}>Sign Up</span></p>
          </form>
          <p className="mt-6 text-xs text-gray-600 text-center">
            I agree to abide by Ridhwan Athaullah's{" "}
            <a href="#" className="border-b border-gray-500 border-dotted">Terms of Service</a> and its{" "}
            <a href="#" className="border-b border-gray-500 border-dotted">Privacy Policy</a>
          </p>
        </div>


      </div>
    </AuthLayout>
  )
}

export default Login