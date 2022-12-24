import React from 'react';
import Move from './Move';
import { Navbar } from './Navbar';

const HeaderHotel = () => {
  return (
    <div className=' bg-[#1e35cc] text-white pb-16'>
      <div className='max-w-[1280px] flex m-auto px-4'>
        <div className='w-full flex flex-col relative'>
          <Navbar />
          <Move />
        </div>
      </div>
    </div>
  );
};

export default HeaderHotel;
