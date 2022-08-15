import React, { FC } from 'react';

import './Header.scss';

// Page header
const Header: FC = (props) => {
  return (
    <>
      <h3 className='page__header'>
        {props.children}
      </h3>
      <hr className='page__headerHr'/>
    </> 
  );
};
export default Header;