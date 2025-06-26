import React, { useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();


  //handle Login form:
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
      <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
      <p className='text-xs text-slate700 mt-[5px0 mb-6'>Please Enter login Credentials</p>

      <form onSubmit={handleLogin}>
        <Input
        value={email}
        onChange= {({target}) => setEmail(target.value)}
        label='Email Address'
        placeholder='Enter your email'
        type='text'
        />
        <Input
        value={password}
        onChange= {({target}) => setPassword(target.value)}
        label='Password'
        placeholder='Enter your password'
        type='password'
        />
      </form>
      </div>
    </AuthLayout>
  )
}

export default Login