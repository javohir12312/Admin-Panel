// import {Form, Input, Button} from 'antd';
import React from 'react';
import {Button, Checkbox, Form, Input, Modal} from 'antd';
import {useState} from 'react';
import style from './Modal.module.scss';
import axios from 'axios';
import {useEffect} from 'react';
import Loader from '../Loader/Loader';

const Page1 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //loader is true
  const [loading, setLoading] = useState(true);

  // data
  const [data, setData] = useState([]);

  //Modal open
  const showModal = () => {
    setIsModalOpen(true);
  };
  //Modal close
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function Finish(values) {
    console.log(values);
  }

  //axios get data
  useEffect(() => {
    axios.get('http://18.216.178.179/api/v1/edu').then((res) => {
      setData(res.data.data);
      console.log(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={style.modal}>
          <Modal
            width={1100}
            title='Basic Modal'
            visible={isModalOpen}
            footer={null}
            onCancel={handleCancel}>
            <Form className={style.form} onFinish={Finish}>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                }}>
                <Form.Item
                  label='username'
                  required={true}
                  name='description_Uz'>
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
                <Form.Item label='name'>
                  <Input placeholder='write education name' />
                </Form.Item>
              </Form>

              <Form.Item
                label='isOnline'
                valuePropName='checked'
                name='isOnlineExists'>
                <Checkbox type='Checkbox' />
              </Form.Item>

              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  width: 200,
                  marginLeft: 'auto',
                }}>
                <Button type='primary' style={{width: '50%'}}>
                  Cencel
                </Button>
                <Button type='primary' style={{width: '50%'}}>
                  Create
                </Button>
              </div>
            </Form>
          </Modal>
          <Button
            style={{width: '100%', zIndex: 0}}
            onClick={showModal}
            type='primary'>
            Add Education
          </Button>

          {data.map((item) => {
            return (
              <div className={style.box} key={item.id}>
                <ul>
                  <li>
                    <p>Name:</p>
                  </li>
                  <li>
                    <p>{item.name_Uz} (Uz)</p>
                  </li>
                  <li>
                    <p>{item.name_Ru} (Ru)</p>
                  </li>
                  <li>
                    <p>{item.name_En}(En)</p>
                  </li>
                  <li>
                    <a href={`tel:+998${item.phone}`}>{item.phone}</a>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Page1;
