import React, { FC } from 'react';

import './TextSeparator.scss';

// Renders separator block: ------ YourText ------
const TextSeparator: FC = (props) => {
  return (
    <div
      className='textSeparator'
      style={{
        display: 'flex',
      }}
    >
      <div className='textSeparator__lineWrap'>
        <div className='line' />
      </div>
      <div className='textSeparator__text'>{props.children}</div>
      <div className='textSeparator__lineWrap'>
        <div className='line' />
      </div>
    </div>
  );
};

export default TextSeparator;