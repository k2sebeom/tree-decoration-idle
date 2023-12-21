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
    deleteOrnament?: () => void;
    onMove?: ((x: number, y: number) => void);
}

function Ornament({ name, x, y, type, onMove, addOrnament, deleteOrnament }: OrnamentProps) {
  const [{ opacity }, drag] = useDrag(() => ({
    type: ItemTypes.ORNAMENT,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
    end: (_, monitor) => {
      const result = monitor.getDropResult() as DropResult;
      
      if(result) {
        if(result.action === 'place') {
          if(type === 'source' && addOrnament) {
            addOrnament({
              name,
              x: result.x,
              y: result.y,
            })
          } else if (type === 'static' && onMove) {
            onMove(result.x, result.y);
          }
        } else if(result.action === 'delete') {
          if(type === 'static' && deleteOrnament) {
            deleteOrnament();
          } 
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
          opacity: type === 'source' ? 1 : opacity,
          position: type === 'source' ? 'static' : 'absolute',
        }}
      />
  )
}

export default Ornament;