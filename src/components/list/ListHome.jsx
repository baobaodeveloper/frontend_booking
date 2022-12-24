import React from 'react';
import { URL } from '../../constants/common';
import useFetch from '../../hooks/useFetch';

const items = [
  'https://images.unsplash.com/photo-1665686308707-419a10042d32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',

  'https://images.unsplash.com/photo-1669123547602-b85454d7ee84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',

  'https://images.unsplash.com/photo-1668957714470-e5b8fc2db617?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',

  'https://images.unsplash.com/photo-1669123547602-b85454d7ee84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
];
const ListHome = () => {
  const { data, loading, err, reFetch } = useFetch(
    `${URL}/hotel?featured=true&limit=4`
  );
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h3 className='text-2xl text-black font-semibold'>
            Homes guests love
          </h3>
          <div className='grid xl:grid-cols-4 gap-x-3 md:grid-cols-2 mt-2'>
            {data.length > 0 &&
              data.map((d, i) => (
                <div
                  key={i}
                  className='w-full cursor-pointer xl:mt-0 mt-3'
                >
                  <img
                    className='w-full h-[300px] object-cover rounded-sm'
                    src={items[i]}
                    alt={d.title}
                  />
                  <div className='flex flex-col gap-2'>
                    <h3 className='mt-3 mb-0 text-black font-semibold text-lg'>
                      {d.title}
                    </h3>
                    <span className='text-lg'>{d.address}</span>
                    <span className='text-lg font-semibold'>
                      Stating from ${d.cheapestPrice || 0}
                    </span>
                    <div className='flex items-center gap-x-3'>
                      {d?.point && (
                        <span className='inline-block w-7 h-7 bg-[#1e35cc] text-white rounded-sm leading-7 text-center font-semibold'>
                          {d.point}
                        </span>
                      )}
                      {d?.rating && (
                        <span className='capitalize text-md'>
                          {d.rating}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ListHome;
