import React from 'react';

import { OrnamentInfo } from '../models/ornament';
import { NAME_MAPPING } from '../utils/ornaments';
import { useDrag } from 'react-dnd';
import { DropResult, ItemTypes } from '../models/item-types';

interface OrnamentProps {
    name: string;
    x: number;
    y: number;
    type: 'static' | 'source';
    addOrnament?: ((o: OrnamentInfo) => void);
    onMove?: ((x: number, y: number) => void);
}

function Ornament({ name, x, y, type, onMove, addOrnament }: OrnamentProps) {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.ORNAMENT,
    end: (_, monitor) => {
      const result = monitor.getDropResult() as DropResult;
      
      if(result) {
        if(type === 'source' && addOrnament) {
          addOrnament({
            name,
            x: result.x,
            y: result.y,
          })
        } else if (type === 'static' && onMove) {
          onMove(result.x, result.y);
        }
      }
    }
  }));

  return (
      <img
        ref={drag}
        className='prop'
        src={NAME_MAPPING[name].source}
        alt={name}
        style={{
          backgroundColor: 'transparent',
          transform: 'translate(0, 0)',
          width: NAME_MAPPING[name].width,
          left: x,
          top: y,
          position: type === 'source' ? 'static' : 'absolute',
        }}
      />
  )
}

export default Ornament;