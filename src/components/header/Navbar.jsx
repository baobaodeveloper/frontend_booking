import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SiYourtraveldottv } from 'react-icons/si';
import { AuthContext } from '../../context/AuthContext';
import { Popover } from 'antd';
import { BiLogOut } from 'react-icons/bi';

export const Navbar = () => {
  const { dispatch, user } = useContext(AuthContext);

  const handleLogin = () => {
    dispatch({ type: 'OPEN_MODAL' });
  };
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };
  const handleRegister = () => {
    dispatch({ type: 'OPEN_REGISTER' });
  };
  return (
    <div className='flex items-center justify-between w-full pt-4 pb-4'>
      <Link
        to='/'
        className='flex items-center gap-2 text-white no-underline text-lg'
      >
        <SiYourtraveldottv />
        <span>baobaobooking</span>
      </Link>
      {user ? (
        <Popover
          placement='bottom'
          content={
            <div
              onClick={handleLogout}
              className='cursor-pointer text-xl font-semibold flex items-center gap-x-2'
            >
              <BiLogOut className='mt-1' /> <span>Logout</span>
            </div>
          }
          trigger='click'
        >
          <div className='flex items-center gap-2 cursor-pointer'>
            {user.image ? (
              <img
                src={user.image}
                className='w-10 h-10 object-cover rounded-full'
                alt=''
              />
            ) : (
              <span className='w-10 h-10 rounded-full inline-block bg-orange-400 text-white text-xl font-semibold leading-8 text-center'>
                {user.username
                  ? user.username.slice(0, 1).toUpperCase()
                  : 'U'}
              </span>
            )}

            <span>{user.username || 'user'}</span>
          </div>
        </Popover>
      ) : (
        <div className='flex items-center text-md gap-2 font-semibold'>
          <button
            onClick={handleRegister}
            type='button'
            className='text-black bg-gray-100 hover:bg-green-300 transition-all duration-300 
          hover:text-white rounded-lg text-sm px-4 py-1.5 '
          >
            Register
          </button>
          <button
            onClick={handleLogin}
            type='button'
            className='text-black bg-gray-100 hover:bg-red-300 transition-all duration-300
           hover:text-white  rounded-lg text-sm px-5 py-1.5 '
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};
