import { Form, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { Upload, Button } from 'antd';
import axios from 'axios';
import style from '../Page2/Page2.module.scss';
import Loader from '../Loader/Loader';

const index = () => {
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

    //function take values from form and send to api

    // function Finish(values) {
    //     console.log(values);
    // }

    //axios get data
    useEffect(() => {
        axios.get('http://18.216.178.179/api/v1/other').then((res) => {
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
                <>
                    <Button type='primary' onClick={showModal}>
                        Add It courses
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
                        <Form onFinish={(e) => console.log(e)}>
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
                                <Button type='primary' style={{ width: '50%' }}>
                                    Cencel
                                </Button>
                                <Button htmlType='submit' type='primary' style={{ width: '50%' }}>
                                    Create
                                </Button>
                            </div>
                        </Form>
                    </Modal>
                </>
            )}
        </>
    )
}

export default index