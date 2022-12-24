import React, { useContext } from 'react';
import { useState } from 'react';
import { IoIosPin } from 'react-icons/io';
import { AuthContext } from '../../context/AuthContext';
import { openNotificationWithIcon } from '../../utils/notify';
import ReverseModal from './ReverseModal';
import SlideImage from './SlideImage';

const Detail = ({ data, dateStay, options }) => {
  const { user } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const handleClick = () => {
    if (!user?.username) {
      openNotificationWithIcon(
        'warning',
        'Booking',
        'You must have login to booking'
      );
    } else {
      setVisible(true);
    }
  };

  return (
    <>
      <ReverseModal visible={visible} setVisible={setVisible} />
      <div className='max-w-[1280px] flex mx-auto px-4'>
        <div className='flex flex-col gap-4 w-full pt-10'>
          <div className='flex justify-between items-start'>
            <div className='flex flex-col gap-2'>
              <h2 className='text-3xl font-bold'>
                {data.name || 'The hotel'}
              </h2>
              <div className='flex items-center gap-2 text-md font-medium'>
                <IoIosPin />
                <span>{data.address || ''}</span>
              </div>
              {data.distance && (
                <p className='text-xl font-semibold text-blue-500'>
                  Excellent location - {data.distance} from center
                </p>
              )}
              {data.price && (
                <p className='text-xl font-semibold text-green-600'>
                  Book a stay over ${data.cheapestPrice} at this
                  property and get a free airport taxi
                </p>
              )}
            </div>

            <button
              onClick={handleClick}
              type='button'
              className='text-white bg-blue-700 hover:bg-blue-800 
             font-medium text-sm px-5 py-2.5 rounded-md '
            >
              Reserve or Book now!
            </button>
          </div>
          <SlideImage />
          <div className='lg:flex gap-2 items-start'>
            <div className='lg:flex-1 w-full'>
              <h2 className='text-3xl font-bold lg:text-left text-center'>
                {data.name || 'The hotel'}
              </h2>
              <p className='text-lg font-medium'>{data.desc || ''}</p>
            </div>

            <div className='flex flex-col gap-4 bg-blue-100 rounded-lg p-4 lg:w-[330px] w-full lg:mt-0 mt-5'>
              <span className='text-2xl font-bold text-gray-500'>
                Perfect for a {dateStay ? dateStay : 1}-night stay!
              </span>
              <p className='font-semibold text-gray-600'>
                Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Repellat laudantium, cum tempore ut facere
                atque.
              </p>
              <div className='flex items-center gap-1'>
                <span className='text-3xl text-black font-bold'>
                  $
                  {dateStay
                    ? data.cheapestPrice * dateStay * options.room
                    : data.cheapestPrice * options.room}
                </span>
                <span className='text-2xl'>
                  ({dateStay ? dateStay : 1} night)
                </span>
              </div>
              <button
                onClick={handleClick}
                type='button'
                className='text-white bg-blue-700 hover:bg-blue-800 
             font-medium text-sm px-5 py-2.5 rounded-md'
              >
                Reserve or Book Now!
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
