import React from 'react';
import { URL } from '../../constants/common';
import useFetch from '../../hooks/useFetch';

const items = [
  'https://images.unsplash.com/photo-1665686308707-419a10042d32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',

  'https://images.unsplash.com/photo-1669123547602-b85454d7ee84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',

  'https://images.unsplash.com/photo-1668957714470-e5b8fc2db617?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',

  'https://images.unsplash.com/photo-1669123547602-b85454d7ee84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',

  'https://images.unsplash.com/photo-1665686308707-419a10042d32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
];
const ListBrowse = () => {
  const { data, loading, err, reFetch } = useFetch(
    `${URL}/hotel/countByType`
  );
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className='my-6'>
          <h3 className='text-2xl text-black font-semibold'>
            Browse by property type
          </h3>
          <div className='grid xl:grid-cols-5 gap-x-3 lg:grid-cols-3 grid-cols-2 mt-2'>
            {Array.isArray(data) &&
              data.length > 0 &&
              data.map((item, i) => (
                <div
                  key={i}
                  className='flex flex-col xl:mt-0 mt-3 cursor-pointer'
                >
                  <img
                    className='w-full h-[200px]  object-cover rounded-tl-xl rounded-tr-xl'
                    src={items[i] || ''}
                    alt={item.type || ''}
                  />
                  <div>
                    <h4 className='text-xl font-semibold text-black my-1 capitalize'>
                      {item.type || ''}
                    </h4>
                    <span>
                      {item.count || 0} {item.type || ''}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ListBrowse;
