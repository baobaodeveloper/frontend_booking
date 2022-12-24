import React from 'react';
import { useNavigate } from 'react-router-dom';

const items = [
  'https://images.unsplash.com/photo-1665686308707-419a10042d32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',

  'https://images.unsplash.com/photo-1669123547602-b85454d7ee84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',

  'https://images.unsplash.com/photo-1668957714470-e5b8fc2db617?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',

  'https://images.unsplash.com/photo-1669123547602-b85454d7ee84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
];
const Hotel = ({ data }) => {
  const navigator = useNavigate();

  return (
    <div className='lg:col-span-8 col-span-12'>
      <div className='w-full flex flex-col gap-4'>
        {Array.isArray(data) &&
          data.length > 0 &&
          data.map((item, i) => (
            <div
              key={i}
              className='flex items-center justify-between gap-x-4 border-2 p-3 rounded-lg'
            >
              <div className='w-[33%] h-[250px] rounded-md overflow-hidden'>
                <img
                  className='w-full h-full object-cover'
                  src={
                    items[i] ||
                    'https://images.unsplash.com/photo-1669123547602-b85454d7ee84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
                  }
                  alt={item.title}
                />
              </div>
              <div className='flex-1 flex items-center justify-between gap-x-2'>
                <div className='flex flex-col flex-1 justify-between h-[220px]'>
                  <h3 className='text-2xl mb-0 font-semibold text-blue-600'>
                    {item.title}
                  </h3>
                  <span>{item.distance}</span>
                  <span className='text-white bg-green-500 py-1 px-1 rounded-md self-start'>
                    Free by taxis
                  </span>
                  <span className='font-semibold'>
                    {item.description}
                  </span>
                  <span>{item.bed}</span>
                  <span className='text-green-600 font-semibold'>
                    Free cancellation
                  </span>
                  <span className='text-green-400'>
                    You can cancel later,so lock in this great price
                    today!
                  </span>
                </div>

                <div className='w-[32%] h-[220px] flex flex-col justify-between'>
                  <div className='flex items-center justify-between'>
                    {item.rating && (
                      <span className='capitalize text-lg font-semibold'>
                        {item.rating}
                      </span>
                    )}

                    {item.point && (
                      <span className='inline-block w-7 h-7 leading-7 text-center rounded-sm text-white bg-[#1e35cc]'>
                        {item.point}
                      </span>
                    )}
                  </div>
                  <div className='text-end'>
                    <span className='text-3xl font-medium mb-2 inline-block'>
                      ${item.cheapestPrice}
                    </span>
                    <p className='mb-2 opacity-40'>
                      Includes taxas and fees
                    </p>
                    <button
                      onClick={() => {
                        navigator(`/hotel/${item._id}`);
                      }}
                      type='button'
                      className='text-white bg-blue-700 hover:bg-blue-800 
             font-medium text-sm px-5 py-2.5 rounded-md'
                    >
                      See availability
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Hotel;
