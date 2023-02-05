// import {Form, Input, Button} from 'antd';
import React from 'react';
import {Button, Checkbox, Form, Input} from 'antd';
import {useState} from 'react';
import style from './Modal.module.scss';

const Page1 = () => {
  function openModal() {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  }

  function Finish(values) {
    console.log(values);
  }

  const [modal, setModal] = useState(false);
  return (
    <div className={style.modal}>
      <div>
        <Form
        className={style.form}
          onFinish={Finish}
          style={{
            width: '85%',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            top: modal ? '20%' : '-100%',
            zIndex: 10,
          }}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
            <Form.Item label='username' required={true} name='description_Uz'>
              <Input
                style={{width: 300}}
                placeholder='Write education name (Uz)'
              />
            </Form.Item>

            <Form.Item
              label='username'
              required={true}
              name='description_Ru'>
              <Input
                style={{width: 300}}
                placeholder='Write education name (Uz)'
              />
            </Form.Item>
            <Form.Item
              label='username'
              required={true}
              name='description_En'>
              <Input
                style={{width: 300}}
                placeholder='Write education name (Uz)'
              />
            </Form.Item>
          </div>

          <Form>
            <Form.Item label="name">
              <Input placeholder='write education name' />
            </Form.Item>
          </Form>

          <Form.Item label='isOnline' valuePropName="checked" name='isOnlineExists'>
            <Checkbox type='Checkbox'/>
          </Form.Item>


          <Button style={{width: '100%'}} type='primary' htmlType='submit'>
            Send
          </Button>
        </Form>

        <Button
          style={{width: '100%', zIndex: 0}}
          onClick={openModal}
          type='primary'>
          Add Education
        </Button>
      </div>
    </div>
  );
};

export default Page1;
