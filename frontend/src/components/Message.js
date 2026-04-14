import React from 'react';

const Message = ({ variant, children }) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'success':
        return 'alert-success';
      case 'danger':
        return 'alert-danger';
      case 'warning':
        return 'alert-warning';
      case 'info':
        return 'alert-info';
      default:
        return 'alert-primary';
    }
  };

  return <div className={`alert ${getVariantClass()}`}>{children}</div>;
};

export default Message;
