import React from 'react';
import Search from '../search/Search';
import HeaderText from './HeaderText';
import Move from './Move';
import { Navbar } from './Navbar';

const Header = () => {
  return (
    <div className=' bg-[#1e35cc] text-white'>
      <div className='max-w-[1280px] flex m-auto px-4'>
        <div className='w-full flex flex-col relative'>
          <Navbar />
          <Move />
          <HeaderText />
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Header;
