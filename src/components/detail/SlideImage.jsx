import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import '../../index.css';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';

const SlideImage = ({ photos }) => {
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
      {photos &&
        photos.map((img, i) => (
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
            {photos &&
              photos.map((img, i) => (
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
