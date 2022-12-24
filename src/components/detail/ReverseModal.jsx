import React, { useState } from 'react';
import { Modal } from 'antd';
import useFetch from '../../hooks/useFetch';
import { URL } from '../../constants/common';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import axios from 'axios';
import { openNotificationWithIcon } from '../../utils/notify';

const ReverseModal = ({ visible, setVisible }) => {
  const navigator = useNavigate();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { id } = useParams();
  const { dates } = useContext(SearchContext);
  const { data } = useFetch(`${URL}/hotel/room/${id}`);

  const getDatesInRange = (startDate, endDate) => {
    let start = new Date(startDate.format('DD/MMM/YYYY')).getTime();
    let end = new Date(endDate.format('DD/MMM/YYYY')).getTime();

    const list = [];
    while (start <= end) {
      list.push(start);
      start += 24 * 60 * 60 * 1000;
    }
    return list;
  };

  const allDates = getDatesInRange(dates[0], dates[1]);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) => {
      return allDates.includes(new Date(date).getTime());
    });
    return !isFound;
  };

  const handleSelected = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            `${URL}/room/availability/${roomId}`,
            {
              dates: allDates,
            }
          );
        })
      );
      openNotificationWithIcon(
        'success',
        'Booking',
        'Booking success'
      );
      setVisible(false);
      navigator('/');
    } catch (error) {
      openNotificationWithIcon('error', 'Booking', error);
    }
  };

  return (
    <div>
      <Modal
        className='check'
        open={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={false}
      >
        <div>
          <p className='mb-4 text-2xl font-semibold'>
            Select your rooms:
          </p>
          <div className='flex flex-col gap-3'>
            {data &&
              data.length > 0 &&
              data.map((item) => (
                <div
                  key={item._id}
                  className='flex justify-between items-center border-2 border-green-600 rounded-lg p-2'
                >
                  <div className='flex flex-col gap-1 w-[70%]'>
                    <span className='text-xl font-semibold'>
                      {item.title}
                    </span>
                    <p className='text-lg'>
                      {item.desc.split(' ').length > 10
                        ? `${item.desc.split(' ').slice(0, 10)}...`
                        : item.desc}
                    </p>
                    <span className='font-medium'>
                      Max people:
                      <span className='font-bold'>
                        {item.maxPeople}
                      </span>
                    </span>
                    <span className='text-xl font-semibold '>
                      ${item.priceNumber}
                    </span>
                  </div>
                  <div className='w-[20%] flex justify-between items-center'>
                    {item.roomNumbers.length > 0 &&
                      item.roomNumbers.map((num) => (
                        <div
                          key={num._id}
                          className='flex flex-col mb-4 items-center '
                        >
                          <label
                            htmlFor='default-checkbox'
                            className=' text-sm font-medium text-gray-900 cursor-pointer'
                          >
                            {num.number}
                          </label>
                          <input
                            onChange={handleSelected}
                            disabled={!isAvailable(num)}
                            value={num._id}
                            id='default-checkbox'
                            type='checkbox'
                            className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 cursor-pointer'
                          />
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
          <button
            onClick={handleClick}
            type='button'
            className='text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-lg px-5 py-2.5 w-full mt-5 '
          >
            Reserve Now!
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ReverseModal;
