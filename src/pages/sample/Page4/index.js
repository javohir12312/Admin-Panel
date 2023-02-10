import { Form, Input, Modal, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import axios from '../../../@crema/services/apis/index';
import style from '../Page2/Page2.module.scss';
import Loader from '../Loader/Loader';
import { EditOutlined, ExclamationCircleFilled } from '@ant-design/icons';
const { confirm } = Modal;
const Page1 = () => {
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

  const [form] = Form.useForm();

  //axios get
  useEffect(() => {
    axios.get('/subjects').then((res) => {
      setData(res.data.data);
      setLoading(false);
    });
  }, [data]);

  ///post data
  const handleSubmit = async (e) => {
    console.log(e);
    const formData = new FormData();
    formData.append('name_Uz', e.name_Uz);
    formData.append('name_Ru', e.name_Ru);
    formData.append('name_En', e.name_En);
    formData.append('photo', e.photo.file);
    console.log(e);
    try {
      const resp = await axios.post('/subjects', formData);
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  }

  ////cler Fporm
  function Clear() {
    setTimeout(() => {
      form.resetFields()
    }, 300);
  }
  //patch data
  const handleEdit = async (e) => {
    const formData = new FormData();
    formData.append('name_Uz', e.name_Uz);
    formData.append('name_Ru', e.name_Ru);
    formData.append('name_En', e.name_En);
    formData.append('photo', e.photo.file);
    console.log(e);
    try {
      const rest = await axios.patch(`/subjects/${edit._id}`, formData);
      console.log(rest);
    } catch (error) {
      console.log(error);
    }
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
            const rest = await axios.delete(`/subjects/${e.target.id}`);
            console.log(rest);
          } catch (error) {
            console.log(error);
          }
        };
        handleDel()
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
      {loading ? <Loader /> :
        <>

          <Button type='primary' onClick={showModal}>
            Add Langs Course
          </Button>


          {data.map((item) => {
            return (
              <div className={style.box} key={item._id}>
                <ul key={item._id}>
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
                    <img src={`http://18.216.178.179/api/v1/img/${item.photo}`} alt="" width={100} height={100} />
                  </li>
                  <li style={{ display: 'flex', gap: 20 }}>
                    <Button id={item._id} onClick={openEdit} type='primary'>
                      Edit <EditOutlined />
                    </Button>

                    <Button id={item._id} onClick={showDeleteConfirm} type='danger'>
                      <span id={item._id}>Delete</span>
                    </Button>
                  </li>
                </ul>
              </div>
            );
          })}

          {/* Modal */}
          <Modal
            width={1100}
            title='Basic Modal'
            visible={isModalOpen == "add" ? true : false}
            footer={null}
            onCancel={handleCancel}>
            <Form form={form} onFinish={handleSubmit}>
              <Form.Item label='Name (Uz)' name="name_Uz">
                <Input placeholder='Write course name lang(Uz)' />
              </Form.Item>
              <Form.Item label='name (Ru)' name="name_Ru">
                <Input placeholder='Write course name lang(Ru)' />
              </Form.Item>
              <Form.Item label='Name (En)' name="name_En">
                <Input placeholder='Write course name lang(En)' />
              </Form.Item>
              <Form.Item label='Course img' name="photo">
                <Upload maxCount={1} accept='.png, .jpeg, .svg' showUploadList={{ showDownloadIcon: false }} action={"http://localhost:3000"}
                  beforeUpload={(file) => {
                    console.log({ file });
                    return false
                  }}
                  listType="picture">
                  <Button>Upload</Button>
                </Upload>
              </Form.Item>
              <div style={{ display: 'flex', gap: 10, width: 200, marginLeft: 'auto' }}>
                <Button type='primary' style={{ width: '50%' }}>
                  Cencel
                </Button>
                <Button onClick={Clear} htmlType='submit' type='primary' style={{ width: '50%' }}>
                  Create
                </Button>
              </div>
            </Form>

          </Modal>

          <Modal
            title={edit.name_Uz}
            style={{ top: 20 }}
            visible={isModalOpen == "edit" ? true : false}
            footer={null}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}>
            <Form form={form} onFinish={handleEdit}>
              <Form.Item
                label='Name (Uz)'
                name='name_Uz'>
                <Input placeholder='Write course name lang(Uz)' />
              </Form.Item>
              <Form.Item
                label='name (Ru)'
                name='name_Ru'>
                <Input placeholder='Write course name lang(Ru)' />
              </Form.Item>
              <Form.Item
                label='Name (En)'
                name='name_En'>
                <Input placeholder='Write course name lang(En)' />
              </Form.Item>
              <Form.Item label='Course img' name='photo'>
                <Upload
                  maxCount={1}
                  accept='.png, .jpeg, .svg'
                  showUploadList={{ showDownloadIcon: false }}
                  action={'http://localhost:3000'}
                  beforeUpload={(file) => {
                    console.log({ file });
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
                  style={{ width: '50%' }}>
                  Cencel
                </Button>
                <Button
                  htmlType='submit'
                  onClick={Clear}
                  type='primary'
                  style={{ width: '50%' }}>
                  Edit
                </Button>
              </div>
            </Form>
          </Modal>

        </>
      }
    </>

  );
};

export default Page1;
