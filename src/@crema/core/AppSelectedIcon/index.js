import React from 'react';
import PropTypes from 'prop-types';


import clsx from 'clsx';
import './index.style.less';
import {CheckOutlined} from '@ant-design/icons';

const AppSelectedIcon = ({backgroundColor, isCenter = true, color}) => {
  return (
    <div
      className={clsx('app-selected-icon', {isCenter: isCenter})}
      style={{
        backgroundColor: backgroundColor || 'blue',
        color: color || 'cyan',
      }}>
      <CheckOutlined />
    </div>
  );
};

export default AppSelectedIcon;

AppSelectedIcon.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  isCenter: PropTypes.bool,
};
