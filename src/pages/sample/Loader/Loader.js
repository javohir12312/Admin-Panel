import { Space, Spin } from 'antd';
const Loader = () => (
  <Space style={{display:"flex" , justifyContent:"center", alignContent: "center", height:"100%"}} size="large">
    <Spin  size="large" />
  </Space>
);
export default Loader;