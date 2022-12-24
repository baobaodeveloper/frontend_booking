import React from 'react';
import { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const Password = ({ name, label, register, errors }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='flex-1'>
      <div className='flex justify-between mb-2'>
        <label htmlFor='password' className='text-sm'>
          <label htmlFor=''>{label}</label>
        </label>
      </div>
      <div className='relative'>
        <input
          type={showPassword ? 'text' : 'password'}
          {...register(name)}
          id='password'
          className='w-full px-3 py-2 border rounded-md '
          placeholder='*******'
        />
        {showPassword ? (
          <AiFillEye
            onClick={() => setShowPassword(!showPassword)}
            className='text-2xl absolute right-3 top-[50%] -translate-y-[50%] cursor-pointer'
          />
        ) : (
          <AiFillEyeInvisible
            onClick={() => setShowPassword(!showPassword)}
            className='text-2xl absolute right-3 top-[50%] -translate-y-[50%] cursor-pointer'
          />
        )}
      </div>
      {errors[name] && (
        <p className='text-red-500'>{errors[name].message}</p>
      )}
    </div>
  );
};

export default Password;
