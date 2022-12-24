import React from 'react';
import { AiFillFlag } from 'react-icons/ai';
import { MdFlight } from 'react-icons/md';
import { AiFillCar } from 'react-icons/ai';
import { MdAttractions } from 'react-icons/md';
import { FaTaxi } from 'react-icons/fa';

const moveList = [
  { icon: <AiFillFlag />, name: 'Stays' },
  { icon: <MdFlight />, name: 'Flights' },
  { icon: <AiFillCar />, name: 'Car rentals' },
  { icon: <MdAttractions />, name: 'Attractions' },
  { icon: <FaTaxi />, name: 'Airport taxis' },
];
const Move = () => {
  return (
    <div className='flex gap-x-8 mt-4 flex-wrap'>
      {moveList.map((item) => (
        <div
          key={item.name}
          className='flex items-center gap-x-1 border-[1px] border-white px-4 py-2 rounded-2xl hover:text-[#1e35cc] 
        cursor-pointer hover:bg-white transition-all duration-300 mt-2'
        >
          <span>{item.icon}</span>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Move;
