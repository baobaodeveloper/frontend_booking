import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import '../../index.css';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';

const items = [
  'https://images.unsplash.com/photo-1665686307516-1915b9616526?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1669072596436-15df4a8c083d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1661956600654-edac218fea67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80',
  'https://images.unsplash.com/photo-1669054078259-9f305691b761?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
  'https://images.unsplash.com/photo-1666085575722-bdf8a510c2c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=711&q=80',
  'https://images.unsplash.com/photo-1669350267597-98fbb1a57f65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
];
const SlideImage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [index, setIndex] = useState(0);

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
    <div className='w-full grid grid-cols-12 gap-2'>
      {items.map((img, i) => (
        <div
          key={i}
          className='lg:col-span-4 col-span-6 rounded-md overflow-hidden cursor-pointer'
        >
          <div
            onClick={() => {
              showModal();
              setIndex(i);
            }}
            className='w-full'
          >
            <img
              className='w-full h-[200px] object-cover'
              src={img}
              alt={img}
            />
          </div>
        </div>
      ))}
      <Modal
        footer={false}
        wrapClassName='image-slider'
        maskStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
        centered
        closable={false}
        open={isModalOpen}
        width={600}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Swiper
          initialSlide={index}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          slidesPerView={1}
          loop={true}
          modules={[Pagination, Navigation]}
          className='swiper'
        >
          <div>
            {items.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  className='w-full h-[350px] object-cover'
                  src={img}
                  alt={img}
                />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </Modal>
    </div>
  );
};

export default SlideImage;
