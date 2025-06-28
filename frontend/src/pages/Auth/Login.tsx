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

  const{updateUser} = useContext(UserContext);

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
    } catch (error ) {
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  }

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate700 mt-[5px0 mb-6'>Please Enter login Credentials</p>

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
          <button type='submit' className='btn-primary'>Login</button>

          <p className='mt-4'>Don't have an account? <span className='text-primary underline cursor-pointer' onClick={() => navigate('/signup')}>Sign Up</span></p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login