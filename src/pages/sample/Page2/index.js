import {Form, Input, Modal} from 'antd';
import {useEffect, useState} from 'react';
import {Upload, Button} from 'antd';
import axios from 'axios';
import style from '../Page2/Page2.module.scss';
import Loader from '../Loader/Loader';

const Page2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //submit api array
  const [arr, setArr] = useState([]);

  //loader is true
  const [loading, setLoading] = useState(true);

  /// data arr
  const [data, setData] = useState([]);

  //Modal open
  const showModal = () => {
    setIsModalOpen(true);
  };
  //Modal close
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //axios get
  useEffect(() => {
    axios.get('http://18.216.178.179/api/v1/it').then((res) => {
      setData(res.data.data);
      setLoading(false);
    });
  }, [data]);

  function Finish(e) {
    setArr(e);

    console.log(arr);

    handleSubmit()
  }

  function handleSubmit() {
     // POST request for products from fakestore API
     axios({
      method: "post",
      url: "http://18.216.178.179/api/v1/it",
      data: arr,
    })
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function () {
        // handle error
        console.log("xa");
      });
  }


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Button type='primary' onClick={showModal}>
            Add It courses
          </Button>

          {data.map((item) => {
            return (
              <div className={style.box} key={item.id}>
                <ul>
                  <li key={item.id}>
                    <p>Name:</p>
                  </li>
                  <li key={item.id}>
                    <p>{item.name_Uz} (Uz)</p>
                  </li>
                  <li key={item.id}>
                    <p>{item.name_Ru} (Ru)</p>
                  </li>
                  <li key={item.id}>
                    <p>{item.name_En}(En)</p>
                  </li>
                  <li key={item.id}>
                    <img src={item.photo} alt='' />
                  </li>
                </ul>
              </div>
            );
          })}

          {/* modal */}
          <Modal
            width={1100}
            title='Basic Modal'
            visible={isModalOpen}
            footer={null}
            onCancel={handleCancel}>
            <Form onFinish={Finish}>
              <Form.Item label='Name (Uz)' name='name_Uz'>
                <Input placeholder='Write course name lang(Uz)' />
              </Form.Item>
              <Form.Item label='name (Ru)' name='name_Ru'>
                <Input placeholder='Write course name lang(Ru)' />
              </Form.Item>
              <Form.Item label='Name (En)' name='name_En'>
                <Input placeholder='Write course name lang(En)' />
              </Form.Item>
              <Form.Item label='Course img' name='photo'>
                <Upload
                  maxCount={1}
                  accept='.png, .jpeg, .svg'
                  showUploadList={{showDownloadIcon: false}}
                  action={'http://localhost:3000'}
                  beforeUpload={(file) => {
                    console.log({file});
                    return false;
                  }}
                  listType='picture'>
                  <Button>Upload</Button>
                </Upload>
              </Form.Item>
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  width: 200,
                  marginLeft: 'auto',
                }}>
                <Button onClick={handleCancel} type='primary' style={{width: '50%'}}>
                  Cencel
                </Button>
                <Button
                  htmlType='submit'
                  // onClick={handleSubmit}
                  type='primary'
                  style={{width: '50%'}}>
                  Create
                </Button>
              </div>
            </Form>
          </Modal>
        </>
      )}
    </>
  );
};
export default Page2;
