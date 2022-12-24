import { Modal, Spin } from 'antd';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { URLS } from '../../constants/common';
import { AuthContext } from '../../context/AuthContext';
import { openNotificationWithIcon } from '../../utils/notify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../../components/input/Input';
import Password from '../../components/input/Password';
import { BiImageAdd } from 'react-icons/bi';

const schema = yup
  .object({
    username: yup.string().required('Please enter username'),
    phone: yup.string().required('Please enter phone'),
    password: yup.string().required('Please enter password'),
    city: yup.string().required('Please enter city'),
    country: yup.string().required('Please enter country'),
    email: yup
      .string()
      .email('Email is invalid')
      .required('Please enter email'),
  })
  .required();
export const Register = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      phone: '',
      city: '',
      country: '',
      email: '',
    },
    resolver: yupResolver(schema),
  });
  const { dispatch, registerModal } = useContext(AuthContext);
  const [image, setImage] = useState('');

  const handleClick = async (value) => {
    let img = '';
    setLoading(true);
    try {
      if (image) {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'upload');

        const url = await axios.post(
          'https://api.cloudinary.com/v1_1/baobaodev/image/upload',
          data
        );
        img = url.data.url;
      }
      await axios.post(
        `${URLS}/auth/register`,
        {
          ...value,
          image: img,
        },
        {
          withCredentials: false,
        }
      );
      openNotificationWithIcon(
        'success',
        'Register',
        'Register success'
      );
      dispatch({ type: 'CLOSE_REGISTER' });
      dispatch({ type: 'OPEN_MODAL' });
      setImage('');
      reset({
        username: '',
        password: '',
        phone: '',
        city: '',
        country: '',
        email: '',
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      openNotificationWithIcon('error', 'Register', 'Register fail');
    }
  };

  return (
    <Modal
      maskClosable={false}
      centered={true}
      open={registerModal}
      onOk={() => dispatch({ type: 'CLOSE_REGISTER' })}
      onCancel={() => dispatch({ type: 'CLOSE_REGISTER' })}
      footer={false}
    >
      <div className='flex flex-col  p-6 rounded-md sm:p-10 '>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Register</h1>
          <p className='text-sm'>Register to booking</p>
        </div>
        <form
          onSubmit={handleSubmit(handleClick)}
          className='space-y-12'
        >
          <div className='space-y-4'>
            <div className='flex justify-between gap-x-2'>
              <Input
                name='username'
                label='Username'
                register={register}
                errors={errors}
              />
              <Input
                name='email'
                label='Email'
                register={register}
                errors={errors}
              />
            </div>
            <div className='flex justify-between gap-x-2'>
              <Password
                name='password'
                label='Password'
                register={register}
                errors={errors}
              />
              <Input
                name='phone'
                label='Phone'
                register={register}
                errors={errors}
              />
            </div>
            <div className='flex justify-between gap-x-2'>
              <Input
                name='city'
                label='City'
                register={register}
                errors={errors}
              />
              <Input
                name='country'
                label='Country'
                register={register}
                errors={errors}
              />
            </div>
            <div className='flex justify-center'>
              <div
                className='w-20 h-20  rounded-full  relative bg-gray-400 
              cursor-pointer flex justify-center items-center overflow-hidden'
              >
                {!image && (
                  <BiImageAdd className='absolute  z-10 text-4xl' />
                )}
                {image && (
                  <img
                    className='w-full h-full object-cover  '
                    src={image && URL.createObjectURL(image)}
                    alt=''
                  />
                )}

                <input
                  className='absolute inset-0 opacity-0 cursor-pointer  z-20'
                  type='file'
                  accept='image/png, image/jpeg'
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>
          </div>
          <div className='space-y-2'>
            <div>
              {loading ? (
                <div className='flex justify-center'>
                  <Spin />
                </div>
              ) : (
                <button
                  type='submit'
                  className='w-full px-6 py-1 font-semibold rounded-md bg-blue-500 
                text-white text-lg hover:scale-105 transition-all duration-150'
                >
                  Register
                </button>
              )}
            </div>
            <p className='px-6 text-sm text-center dark:text-gray-400'>
              Don't have an account yet?
              <button
                type='button'
                onClick={() => {
                  dispatch({ type: 'OPEN_MODAL' });
                  dispatch({ type: 'CLOSE_REGISTER' });
                }}
                className='hover:underline dark:text-violet-400'
              >
                Login
              </button>
              .
            </p>
          </div>
        </form>
      </div>
    </Modal>
  );
};
