import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL } from '../../constants/common';
import useFetch from '../../hooks/useFetch';

const items = [
  {
    image:
      'https://images.unsplash.com/photo-1665686308707-419a10042d32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    title: 'HCM City',
  },
  {
    image:
      'https://images.unsplash.com/photo-1669123547602-b85454d7ee84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    title: 'HUE City',
  },
  {
    image:
      'https://images.unsplash.com/photo-1668957714470-e5b8fc2db617?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    title: 'DN city',
  },
];
const ListProp = () => {
  const { data: list } = useFetch(`${URL}/hotel`);
  const [listCity, setListCity] = useState([]);
  const navigator = useNavigate();
  const { data, loading, err, reFetch } = useFetch(
    `${URL}/hotel/countByCity?cities=${listCity
      .slice(0, 3)
      .join(', ')}`
  );

  useEffect(() => {
    if (list) {
      const citise = list.map((item) => item.city);
      (async () => {
        try {
          const { data } = await axios.get(
            `${URL}/hotel/countByCity?cities=${[...new Set(citise)]
              .slice(0, 3)
              .join(', ')}`
          );
          const newList = data.map((item, i) => ({
            prop: item,
            city: [...new Set(citise)].slice(0, 3)[i],
          }));

          setListCity(newList);
        } catch (error) {}
      })();
    }
  }, [list]);

  return (
    <>
      <div className='flex items-center gap-6 flex-wrap w-full text-white'>
        {listCity.length > 0 &&
          listCity.map((d, i) => (
            <div
              key={i}
              className='md:w-[32%] sm:w-[48%] cursor-pointer w-[100%] h-[300px] rounded-xl overflow-hidden relative mt-6'
            >
              <img
                className='w-full h-full object-cover'
                src={items[i].image}
                alt={items[i].title}
              />
              <div className='absolute inset-0 flex flex-col justify-end bg-[rgba(0,0,0,0.4)]'>
                <div className='ml-3 mb-3'>
                  <h3 className='text-3xl font-semibold'>
                    {d?.city}
                  </h3>
                  <span className='text-2xl font-semibold'>
                    {d.prop || 0} properties
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ListProp;
