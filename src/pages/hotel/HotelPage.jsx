import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { Footer } from '../../components/footer/Footer';
import HeaderHotel from '../../components/header/HeaderList';
import Hotel from '../../components/hotel/Hotel';
import SearchHotel from '../../components/hotel/SearchHotel';
import { AiFillFilter } from 'react-icons/ai';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useLocation } from 'react-router-dom';
import '../../index.css';
import { URL } from '../../constants/common';
import useFetch from '../../hooks/useFetch';

dayjs.extend(customParseFormat);

const HotelPage = () => {
  const { state } = useLocation();
  const [searchInfor, setSearchInfor] = useState({
    where: state.where || 'HCM city',
    dateFrom: dayjs(JSON.parse(state.date)[0]),
    dateTo: dayjs(JSON.parse(state.date)[1]),
    adult: state.adult || 1,
    children: state.children || 0,
    room: state.room || 1,
    maxPrice: 999,
    minPrice: 0,
  });
  const { data, loading, err, reFetch } = useFetch(
    `${URL}/hotel?city=${searchInfor.where}&min=${searchInfor.minPrice}&max=${searchInfor.maxPrice}`
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className='flex flex-col'>
      <HeaderHotel />
      <div className='flex justify-center pt-10'>
        <div className='grid grid-cols-12 w-[1280px] px-4'>
          <div className='lg:hidden block col-span-12'>
            <div className='w-full flex justify-end mb-4'>
              <span className='w-12 h-12 bg-blue-500 rounded-md flex justify-center items-center'>
                <AiFillFilter
                  onClick={showModal}
                  className='text-4xl text-white cursor-pointer'
                />
              </span>
            </div>
            <Modal
              centered={true}
              footer={null}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <SearchHotel
                searchInfor={searchInfor}
                setSearchInfor={setSearchInfor}
              />
            </Modal>
          </div>
          <div className='lg:block hidden col-span-4 mr-8 self-start'>
            <SearchHotel
              searchInfor={searchInfor}
              reFetch={reFetch}
              setSearchInfor={setSearchInfor}
            />
          </div>
          <Hotel data={data} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HotelPage;
