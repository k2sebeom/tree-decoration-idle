import React from 'react';
import trashImg from '../assets/images/delete.png';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../models/item-types';


function TrashArea() {
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
    >
      <img
        alt='trash'
        src={trashImg}
        width={48}
        style={{
          position: 'absolute',
          top: 5,
          right: 5,
        }}
      />
    </div>
  )
}

export default TrashArea;