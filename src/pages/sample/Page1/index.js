import {Form, Input, Modal, Upload} from 'antd';
import {useEffect, useState} from 'react';
import {Button} from 'antd';
import axios from '../../../@crema/services/apis/index';
import style from '../Page2/Page2.module.scss';
import Loader from '../Loader/Loader';
import {EditOutlined, ExclamationCircleFilled} from '@ant-design/icons';
const {confirm} = Modal;

const Page2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //loader is true
  const [loading, setLoading] = useState(true);
  /// data arr
  const [data, setData] = useState([]);
  //data edit arr
  const [edit, setEdit] = useState([]);

  //Modal open
  const showModal = () => {
    setIsModalOpen("add");
  };
  //Modal close
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //axios get
  useEffect(() => {
    axios.get('/edu').then((res) => {
      setData(res.data.data);
      setLoading(false);
    });
  }, [data]);

  ///post data
  const handleSubmit = async (e) => {
    console.log(e);
    try {
      const resp = await axios.post('/edu', e);
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  //patch data
  const handleEdit = async (e) => {
    try {
      const rest = await axios.patch(`/edu/${edit._id}`, e);
      console.log(rest);
    } catch (error) {
      console.log(error);
    }
  };

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleFilled />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  function openEdit(e) {
    const id = e.currentTarget.id;
    console.log(id);

    data.map((item) => {
      setIsModalOpen("edit")
      if (item._id === id) {
        return setEdit(item), console.log(edit);
      }
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
                    <p>Name:</p>{' '}
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
                  <li style={{display: 'flex', gap: 20}}>
                    <Button id={item._id} onClick={openEdit} type='primary'>
                      Edit <EditOutlined />
                    </Button>

                    <Button onClick={showDeleteConfirm} type='danger'>
                      Delete
                    </Button>
                  </li>
                </ul>
              </div>
            );
          })}

          {/* modal */}
          <Modal
            width={1100}
            title='Basic Modal'
            visible={isModalOpen == "add" ? true : false}
            footer={null}
            onCancel={handleCancel}>
            <Form onFinish={handleSubmit}>
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
                <Button
                  onClick={handleCancel}
                  type='primary'
                  style={{width: '50%'}}>
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

          <Modal
            title='20px to Top'
            style={{top: 20}}
            visible={isModalOpen == "edit" ? true : false}
            footer={null}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}>
            <Form onFinish={handleEdit}>
              <Form.Item
                label='Name (Uz)'
                name='name_Uz'
                initialValue={edit.name_Uz}>
                <Input placeholder='Write course name lang(Uz)' />
              </Form.Item>
              <Form.Item
                label='name (Ru)'
                name='name_Ru'
                initialValue={edit.name_Ru}>
                <Input placeholder='Write course name lang(Ru)' />
              </Form.Item>
              <Form.Item
                label='Name (En)'
                name='name_En'
                initialValue={edit.name_En}>
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
                <Button
                  onClick={handleCancel}
                  type='primary'
                  style={{width: '50%'}}>
                  Cencel
                </Button>
                <Button
                  htmlType='submit'
                  // onClick={handleSubmit}
                  type='primary'
                  style={{width: '50%'}}>
                  Edit
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
