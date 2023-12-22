import React from 'react';
import clearImg from '../assets/images/clear.png';

interface ClearButtonProps {
    onClick: React.MouseEventHandler<HTMLImageElement>;
    isActive: boolean;
}

function ClearButton({onClick, isActive}: ClearButtonProps) {

  return (
    <div
      className='moveButton'
      onClick={onClick}
      style={{
        position: 'absolute',
        top: 30,
        left: isActive ? 5 : -60,
      }}
    >
      <img
        alt='clear'
        src={clearImg}
        width={48}
        style={{
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

export default ClearButton;