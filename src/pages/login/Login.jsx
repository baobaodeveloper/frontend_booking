import { Modal, Spin } from 'antd';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { URL } from '../../constants/common';
import { AuthContext } from '../../context/AuthContext';
import { openNotificationWithIcon } from '../../utils/notify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../../components/input/Input';
import Password from '../../components/input/Password';

const schema = yup
  .object({
    username: yup.string().required('Please enter username'),
    password: yup.string().required('Please enter password'),
  })
  .required();
export const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const { dispatch, visibleModal } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleClick = async (value) => {
    dispatch({ type: 'LOGIN_START' });
    setLoading(true);
    try {
      const res = await axios.post(`${URL}/auth/login`, value, {
        withCredentials: false,
      });
      openNotificationWithIcon('success', 'Login', 'Login success');
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      reset({
        username: '',
        password: '',
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch({ type: 'LOGIN_FAIL' });
      openNotificationWithIcon('error', 'Login', 'Login fail');
    }
  };

  return (
    <Modal
      maskClosable={false}
      centered={true}
      open={visibleModal}
      onOk={() => dispatch({ type: 'CLOSE_MODAL' })}
      onCancel={() => dispatch({ type: 'CLOSE_MODAL' })}
      footer={false}
    >
      <div className='flex flex-col  p-6 rounded-md sm:p-10 '>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Log in</h1>
          <p className='text-sm'>Login to access your account</p>
        </div>
        <form
          onSubmit={handleSubmit(handleClick)}
          className='space-y-12'
        >
          <div className='space-y-4'>
            <Input
              name='username'
              label='Username'
              register={register}
              errors={errors}
            />
            <Password
              name='password'
              label='Password'
              register={register}
              errors={errors}
            />
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
                  Login
                </button>
              )}
            </div>
            <p className='px-6 text-sm text-center dark:text-gray-400'>
              Don't have an account yet?
              <button
                type='button'
                onClick={() => {
                  dispatch({ type: 'CLOSE_MODAL' });
                  dispatch({ type: 'OPEN_REGISTER' });
                }}
                className='hover:underline dark:text-violet-400'
              >
                Register
              </button>
              .
            </p>
          </div>
        </form>
      </div>
    </Modal>
  );
};
