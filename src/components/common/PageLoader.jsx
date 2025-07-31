import { Spin } from 'antd';

export default function PageLoader() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Spin size="large" tip="Loading..." />
    </div>
  );
}