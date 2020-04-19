import React from 'react';
import './button.styles.scss';

const Button = ({ title, ...otherProps }) => {
  return (
    <button {...otherProps} className='btn btn--primary'>
      {title}
    </button>
  );
};

export default Button;
