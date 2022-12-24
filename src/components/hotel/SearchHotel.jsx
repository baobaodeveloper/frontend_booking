import React, { useEffect, useState } from 'react';
import { Input, DatePicker, InputNumber, Select } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import useFetch from '../../hooks/useFetch';
import { URL } from '../../constants/common';

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const SearchHotel = ({ searchInfor, setSearchInfor, reFetch }) => {
  const { data } = useFetch(`${URL}/hotel`);
  const [listCity, setListCity] = useState([]);
  const onChangeDate = (date, dateString) => {
    setSearchInfor((prev) => ({
      ...prev,
      dateFrom: date[0],
      dateTo: date[1],
    }));
  };

  const onChangeSelect = (e) =>
    setSearchInfor({ ...searchInfor, where: e });
  const handleSearch = () => {
    reFetch();
  };
  useEffect(() => {
    if (data) {
      const list = data.map((item) => item.city);
      setListCity(
        [...new Set(list)].map((item) => ({
          label: item,
          value: item,
        }))
      );
    }
  }, [data]);
  return (
    <div className='bg-yellow-500 rounded-xl p-4'>
      <div className='flex flex-col gap-4'>
        <span className='text-3xl font-semibold text-black'>
          Search
        </span>
        <div>
          <span className='text-md font-semibold mb-1'>
            Destination
          </span>
          <Select
            className='bg-white w-full rounded-md'
            name='where'
            options={listCity}
            value={searchInfor.where}
            bordered={false}
            onChange={onChangeSelect}
            size='middle'
            placeholder='Where are you going?'
          />
        </div>

        <div>
          <span className='text-md font-semibold mb-1'>
            Check-in Date
          </span>
          <RangePicker
            className='w-full'
            onChange={onChangeDate}
            defaultValue={[dayjs(), dayjs()]}
            format={'DD/MM/YYYY'}
            value={[searchInfor.dateFrom, searchInfor.dateTo]}
            separator={<span>to</span>}
          />
        </div>

        <div className='flex flex-col gap-4'>
          <span className='text-md font-semibold mb-1'>Options</span>
          <div className='flex items-center justify-between'>
            <span>Min price pernight</span>
            <InputNumber
              addonBefore={
                <span className='text-lg font-semibold'>$</span>
              }
              controls={false}
              min={0}
              value={searchInfor.minPrice}
              name='minPrice'
              onChange={(e) =>
                setSearchInfor({
                  ...searchInfor,
                  minPrice: Number(e) || 0,
                })
              }
              className='w-[150px]'
            />
          </div>
          <div className='flex items-center justify-between'>
            <span>Max price pernight</span>
            <InputNumber
              addonBefore={
                <span className='text-lg font-semibold'>$</span>
              }
              controls={false}
              min={0}
              name='maxPrice'
              value={searchInfor.maxPrice}
              onChange={(e) =>
                setSearchInfor({
                  ...searchInfor,
                  maxPrice: Number(e) || 0,
                })
              }
              className='w-[150px]'
            />
          </div>

          <div className='flex items-center justify-between'>
            <span>Adult</span>
            <InputNumber
              controls={false}
              min={1}
              className='w-[50px]'
              onChange={(e) =>
                setSearchInfor({
                  ...searchInfor,
                  adult: Number(e) || 0,
                })
              }
              name='adult'
              value={searchInfor.adult}
            />
          </div>
          <div className='flex items-center justify-between'>
            <span>Children</span>
            <InputNumber
              controls={false}
              min={0}
              className='w-[50px]'
              onChange={(e) =>
                setSearchInfor({
                  ...searchInfor,
                  children: Number(e) || 0,
                })
              }
              name='children'
              value={searchInfor.children}
            />
          </div>
          <div className='flex items-center justify-between'>
            <span>Room</span>
            <InputNumber
              controls={false}
              min={1}
              className='w-[50px]'
              onChange={(e) =>
                setSearchInfor({
                  ...searchInfor,
                  room: Number(e) || 0,
                })
              }
              name='room'
              value={searchInfor.room}
            />
          </div>
          <button
            onClick={handleSearch}
            type='button'
            className='text-white bg-blue-700 hover:bg-blue-800 
             font-medium rounded-sm text-sm px-5 py-2.5 w-full mt-3'
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchHotel;
