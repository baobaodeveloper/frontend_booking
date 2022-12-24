import React from 'react';
import { Input } from 'antd';

const FooterSub = () => {
  return (
    <div className='bg-[#1e35cc] text-white mt-14 pt-14 mb-10 pb-10'>
      <div className='flex justify-center px-4'>
        <div className='text-center'>
          <h3 className='text-4xl font-semibold tracking-widest'>
            Save time,save money!
          </h3>
          <p className='text-lg'>
            Sign up and we'll send th best deals to you
          </p>
          <div className='flex gap-x-3'>
            <Input placeholder='Your email' />
            <button
              type='button'
              className='text-white bg-green-500 hover:bg-green-600  font-medium
              rounded-lg text-lg px-5 py-2.5'
            >
              Default
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterSub;
