import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';

const Page1 = () => {
  const [state, setState] = useState([]);

  const onFinish2 = (e) => {
    setState(state => state.push(e))
  };


  return (
    <>
      <div>
        <Form onFinish={onFinish2}>
          <Form.Item label="username" name="name">
            <Input placeholder='Username' name='name' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>send</Button>
          </Form.Item>
        </Form>
        </div>

      {/* <h2>{state.length }</h2> */}
      {
        state.map((item) => {
          return (
            <>
              <h2 key={item.username}>{item.name}</h2>
            </>
          )
        })
      }
    </>
  )
}

export default Page1