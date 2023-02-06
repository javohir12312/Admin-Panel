import React from 'react';
import './index.style.less';
import AuthWrapper from '../AuthWrapper';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';
import axios from 'axios';
// import SignInFirebase from './SigninFirebase';

import {Button, Form, Input} from 'antd';

const Signin = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
    login(values.email, values.password);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        'http://18.216.178.179/api/v1/user/login',
        {
          email,
          password,
        },
      );
      localStorage.setItem('token', response.data.token)
      console.log(response.data);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  return (
    <AuthWrapper>
      <AppPageMetadata title='Login' />
      {/* <SignInFirebase /> */}
      <Form
        name='basic'
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'>
        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='remember'
          valuePropName='checked'
          wrapperCol={{
            offset: 8,
            span: 16,
          }}></Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </AuthWrapper>
  );
};

export default Signin;