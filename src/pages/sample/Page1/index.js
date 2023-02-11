import {Form, Input, Button, Upload, Modal, Select, Space, Col} from 'antd';
import {useEffect, useState} from 'react';
import axios from '../../../@crema/services/apis/index';
import style from '../Page2/Page2.module.scss';
import Loader from '../Loader/Loader';
import {EditOutlined, ExclamationCircleFilled} from '@ant-design/icons';
const {confirm} = Modal;

const Page2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //loader is true
  const loading_init = {
    loadingEdu: true,
    loadingLangs: true,
  };
  const [loading, setLoading] = useState(loading_init);
  /// data arr
  const [data, setData] = useState([]);
  /// data langs arr
  const [langs, setLangs] = useState([]);
  //data edit arr
  const [edit, setEdit] = useState([]);


  //Modal open
  const showModal = () => {
    setIsModalOpen('add');
  };
  //Modal close
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //axios get
  useEffect(() => {
    axios.get('/edu').then((res) => {
      setData(res.data.data);
      setLoading({...loading, loadingEdu: false});
    });
  }, [data]);

  //get langs data
  useEffect(() => {
    axios.get('/langs').then((res) => {
      setLangs(res.data.data);
      setLoading({...loading, loadingLangs: false});
    });
  }, [langs]);

  ///post data
  const handleSubmit = async (e) => {
    console.log(JSON.stringify(e));
    let formData = new FormData();

    for (let key in e) {
      if (Array.isArray(e[key])) {
        console.log(key);
        formData.append(key, JSON.stringify(e[key]));
        console.log(e[key]);
      } else if (key === 'photo') {
        formData.append(key, e[key]?.file);
      } else if(key === 'phone'){
        console.log(key, e[key]);
      } else {
        formData.append(key, e[key]);
      }
    }
    console.log(formData);
    try {
      const resp = await axios.post('/edu', formData);
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(localStorage.getItem('token'));

  //patch data
  const handleEdit = async (e) => {
    try {
      const rest = await axios.patch(`/edu/${edit._id}`, e);
      console.log(rest);
    } catch (error) {
      console.log(error);
    }
  };

  const {Option} = Select;
  const handleChange = (value) => {
    console.log(`selected ${JSON.stringify(value)}`);
  };

  const showDeleteConfirm = (e) => {
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleFilled />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        const handleDel = async () => {
          try {
            const rest = await axios.delete(`/edu/${e.target.id}`);
            console.log(rest);
          } catch (error) {
            console.log(error);
          }
        };
        handleDel();
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
      setIsModalOpen('edit');
      if (item._id === id) {
        return setEdit(item), console.log(edit);
      }
    });
  }

  function handleClick(params) {
    console.log(params);
    isModalOpen == 'edit'
      ? handleEdit(params)
      : isModalOpen == 'add'
      ? handleSubmit(params)
      : null;
  }

  return (
    <>
      {loading.loadingEdu && loading.loadingLangs ? (
        <Loader />
      ) : (
        <>
          <Button type='primary' onClick={showModal}>
            Add It courses
          </Button>

          {data.map((item) => {
            return (
              <div className={style.box} key={item.id}>
                <ul key={1}>
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
                    <img
                      src={`http://18.216.178.179/api/v1/img/${item.photo}`}
                      alt='img'
                    />
                  </li>
                  <li style={{display: 'flex', gap: 20}}>
                    <Button id={item._id} onClick={openEdit} type='primary'>
                      Edit <EditOutlined />
                    </Button>

                    <Button
                      id={item._id}
                      onClick={showDeleteConfirm}
                      type='danger'>
                      Delete
                    </Button>
                  </li>
                </ul>
              </div>
            );
          })}

          {/* modal */}
          {/* <Modal
            width={1100}
            title='Basic Modal'
            visible={isModalOpen == 'add' ? true : false}
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
          </Modal> */}

          {/* <Modal
            title='20px to Top'
            style={{top: 20}}
            visible={Boolean(isModalOpen)}
            // visible={isModalOpen == 'edit' ? true : (isModalOpen == 'add' ? true : false)}
            footer={null}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}>
            <Form onFinish={handleClick}>
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
          </Modal> */}

          <Modal
            title='20px to Top'
            style={{top: 20}}
            visible={Boolean(isModalOpen)}
            // visible={isModalOpen == 'edit' ? true : (isModalOpen == 'add' ? true : false)}
            footer={null}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}>
            <Form onFinish={handleClick}>
              <Form.Item
                label='Name (Uz)'
                name='name_Uz'
                initialValue={edit?.name_Uz}>
                <Input placeholder='Write course name lang(Uz)' />
              </Form.Item>
              <Form.Item
                label='name (Ru)'
                name='name_Ru'
                initialValue={edit?.name_Ru}>
                <Input placeholder='Write course name lang(Ru)' />
              </Form.Item>
              <Form.Item
                label='Name (En)'
                name='name_En'
                initialValue={edit?.name_En}>
                <Input placeholder='Write course name lang(En)' />
              </Form.Item>
              <Form.Item label='langs' name='langs'>
                <Select
                  mode='multiple'
                  style={{
                    width: '100%',
                  }}
                  placeholder='select langs'
                  onChange={handleChange}
                  optionLabelProp='label'>
                  {langs.map((item) => {
                    return (
                      <Option
                        key={item.id}
                        value={item._id}
                        label={item.name_Uz}>
                        <Space>
                          {/* <span role='img' aria-label={item.name_Uz}>
                            cn
                          </span> */}
                          {item.name_Uz}
                        </Space>
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item label='phone' name='phone'>
                <Col span={7}>
                  <Input />
                  <Input />
                </Col>
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
                  {isModalOpen}
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
