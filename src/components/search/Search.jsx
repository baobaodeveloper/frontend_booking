import { Input, Select } from 'antd';
import React, { useState } from 'react';
import { AiFillFlag } from 'react-icons/ai';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker, Dropdown } from 'antd';
import { MdOutlineEmojiPeople } from 'react-icons/md';
import { FaAngleLeft } from 'react-icons/fa';
import { FaAngleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import useFetch from '../../hooks/useFetch';
import { URL } from '../../constants/common';
import { useEffect } from 'react';

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const Search = () => {
  const { data } = useFetch(`${URL}/hotel`);
  const [listCity, setListCity] = useState([]);
  const { dispatch } = useContext(SearchContext);
  const navigator = useNavigate();
  const [searchInfor, setSearchInfor] = useState({
    where: 'HCM city',
    date: [
      dayjs(),
      dayjs(
        new Date(dayjs().format()).getTime() + 24 * 60 * 60 * 1000
      ),
    ],
    adult: 1,
    children: 0,
    room: 1,
  });

  const [visible, setVisible] = useState(false);

  const onChangeDate = (date, dateString) => {
    setSearchInfor((prev) => ({
      ...prev,
      date: date,
    }));
  };
  const onChange = (e) => {
    setSearchInfor((prev) => ({ ...prev, where: e.target.value }));
  };
  const onChangeSelect = (e) =>
    setSearchInfor({ ...searchInfor, where: e });
  const descrease = (e) => {
    setSearchInfor((prev) => ({ ...prev, [e.key]: prev[e.key] - 1 }));
  };
  const inscrease = (e) => {
    setSearchInfor((prev) => ({ ...prev, [e.key]: prev[e.key] + 1 }));
  };
  const onSearch = () => {
    dispatch({
      type: 'NEW_SEARCH',
      payload: {
        dates: searchInfor.date,
        city: searchInfor.where,
        options: {
          adult: searchInfor.adult,
          children: searchInfor.children,
          room: searchInfor.room,
        },
      },
    });
    navigator('/hotel', {
      state: {
        ...searchInfor,
        date: JSON.stringify(searchInfor.date),
      },
    });
  };
  const item = [
    { key: 'adult', value: searchInfor.adult },
    { key: 'children', value: searchInfor.children },
    { key: 'room', value: searchInfor.room },
  ];
  const items = item.map((infor) => ({
    key: infor.key,
    label: (
      <div className='flex items-center justify-between text-lg gap-x-4'>
        <span>{infor.key}</span>
        <div className='flex items-center gap-x-2'>
          <FaAngleLeft
            onClick={() => descrease(infor)}
            className={`text-3xl text-red-500 hover:scale-110 block ${
              searchInfor[infor.key] <= 0 ? 'hidden' : ''
            }`}
          />

          <span className='border-[1px] w-[50px] text-center'>
            {infor.value}
          </span>

          <FaAngleRight
            onClick={() => inscrease(infor)}
            className='text-3xl text-green-500  hover:scale-110'
          />
        </div>
      </div>
    ),
  }));

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
    <div className='flex justify-between items-stretch border-2 border-yellow-400 bg-white absolute w-full bottom-0 rounded-md translate-y-[50%]'>
      <Select
        className='bg-transparent rounded-none w-[20%]'
        name='where'
        options={listCity}
        value={searchInfor.where}
        bordered={false}
        onChange={onChangeSelect}
        size='large'
        placeholder='Where are you going?'
        prefix={<AiFillFlag className='opacity-30' />}
      />
      <RangePicker
        className='w-[18%]  outline-none border-0 bg-transparent rounded-none hover:border-0'
        onChange={onChangeDate}
        defaultValue={[dayjs(), dayjs()]}
        format={'DD/MM/YYYY'}
        value={[searchInfor.date[0], searchInfor.date[1]]}
        separator={<span>to</span>}
      />
      <Dropdown
        onOpenChange={(e) => setVisible(e)}
        open={visible}
        trigger={['click']}
        menu={{
          items,
        }}
        placement='bottomLeft'
      >
        <div className='flex gap-x-2 items-center w-[20%] text-black opacity-30'>
          <MdOutlineEmojiPeople className='text-xl' />
          <div className='flex gap-x-1'>
            <span>{searchInfor.adult}</span>
            <span>adult</span>
          </div>
          <div className='flex gap-x-1'>
            <span>{searchInfor.children}</span>
            <span>children</span>
          </div>
          <div className='flex gap-x-1'>
            <span>{searchInfor.room}</span>
            <span>room</span>
          </div>
        </div>
      </Dropdown>

      <button
        onClick={onSearch}
        className=' relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300'
      >
        <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0'>
          SEARCH
        </span>
      </button>
    </div>
  );
};

export default Search;
