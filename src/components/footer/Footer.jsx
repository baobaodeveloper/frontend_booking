import React from 'react';
import FooterMenu from './FooterMenu';
import FooterSub from './FooterSub';

export const Footer = () => {
  return (
    <div className='flex flex-col'>
      <FooterSub />
      <FooterMenu />
    </div>
  );
};
