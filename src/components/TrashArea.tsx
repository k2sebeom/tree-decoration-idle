import React from 'react';
import trashImg from '../assets/images/delete.png';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../models/item-types';


interface TrashAreaProps {
  isActive: boolean;
}

function TrashArea({ isActive }: TrashAreaProps) {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.ORNAMENT,
    drop: (_, monitor) => {
      const offset = monitor.getSourceClientOffset();
      return {
        action: 'delete',
        ...offset,
      };
    },
  }))

  return (
    <div
      ref={drop}
      style={{
        position: 'absolute',
        top: 5,
        right: isActive ? 5 : -60,
      }}
      className='moveArea'
    >
      <img
        alt='trash'
        src={trashImg}
        width={48}
      />
    </div>
  )
}

export default TrashArea;