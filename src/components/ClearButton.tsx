import React from 'react';
import clearImg from '../assets/images/clear.png';

interface ClearButtonProps {
    onClick: React.MouseEventHandler<HTMLImageElement>;
}

function ClearButton({onClick}: ClearButtonProps) {
  return (
    <img
      alt='clear'
      src={clearImg}
      width={48}
      style={{
        position: 'absolute',
        top: 5,
        left: 5,
      }}
      onClick={onClick}
    />
  )
}

export default ClearButton;