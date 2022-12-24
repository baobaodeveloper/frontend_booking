import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const HeaderText = () => {
  const { dispatch, user } = useContext(AuthContext);
  const handleLogin = () => {
    dispatch({ type: 'OPEN_MODAL' });
  };
  return (
    <div className='xl:pt-20 xl:pb-32 pt-16 pb-24'>
      <h1 className='text-5xl lg:3xl'>
        A lifetime of discounts?It's Genius
      </h1>
      <p className='mt-2'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Magnam, sequi.
      </p>
      {!user && (
        <button
          onClick={handleLogin}
          type='button'
          className='text-black bg-green-200 hover:bg-green-300 transition-all duration-300
            rounded-lg text-sm px-5 py-1.5 font-semibold'
        >
          Register/Login
        </button>
      )}
    </div>
  );
};

export default HeaderText;
