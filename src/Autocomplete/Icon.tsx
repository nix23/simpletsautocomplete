import React from 'react';

import './Icon.scss';

type IconProps = {
  onClick?: Function,
  rightIcon?: boolean,
  children: React.ReactNode 
};

// Icon which is rendered in left or right side of input.
const AutocompleteIcon = (props: IconProps) => {
  let wrapProps = {
    className: 'autocomplete__inputIconWrap',
    onClick: () => (typeof props.onClick == 'function') && props.onClick(),
  };
  wrapProps.className += (props.rightIcon)
    ? ' autocomplete__inputIconWrapRight'
    : ' autocomplete__inputIconWrapLeft';

  return (
    <div {...wrapProps}>
      <div className='autocomplete__inputIcon'>
        {props.children}
      </div>
    </div>
  );
};

export default AutocompleteIcon;