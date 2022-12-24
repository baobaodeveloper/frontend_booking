import React from 'react';

const Input = ({ name, errors, register, label }) => {
  return (
    <div className='flex-1'>
      <label htmlFor='username' className='block mb-2 text-sm'>
        {label}
      </label>
      <input
        autoComplete='off'
        type='text'
        {...register(name)}
        id='username'
        placeholder={label}
        className='w-full px-3 py-2 border rounded-md '
      />
      {errors[name] && (
        <p className='text-red-500'>{errors[name].message}</p>
      )}
    </div>
  );
};

export default Input;
