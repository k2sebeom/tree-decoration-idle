import React from 'react';
import treeImg from '../assets/images/tree.png'
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../models/item-types';


function Tree() {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.ORNAMENT,
    drop: (_, monitor) => {
      const offset = monitor.getSourceClientOffset();
      return {
        ...offset,
      };
    },
  }))

  return (
    <div ref={drop}>
      <img
        width={400}
        src={treeImg}
        alt='tree'
        style={{
          pointerEvents: 'none',
          marginBottom: 10,
        }}
      />
    </div>
  )
}

export default Tree;