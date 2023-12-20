import React, { useState } from 'react';


import cane1Img from '../assets/props/cane.png'
import { OrnamentInfo } from '../models/ornament';


export const NAME_MAPPING: Record<string, OrnamentType> = {
    'cane1': {
      source: cane1Img,
      width: 50,
    },
}

interface OrnamentProps {
    name: string;
    x: number;
    y: number;
    type: 'static' | 'source';
    addOrnament?: ((o: OrnamentInfo) => void);
    onMove?: ((x: number, y: number) => void);
}

interface OrnamentType {
  source: string;
  width: number;
}

function Ornament({ name, x, y, type, onMove, addOrnament }: OrnamentProps) {
  const [w, setW] = useState<number>(0);
  const [h, setH] = useState<number>(0);

  return (
    <img
      className='prop'
      src={NAME_MAPPING[name].source}
      alt={name}
      style={{
        width: NAME_MAPPING[name].width,
        left: x,
        top: y,
        position: type === 'source' ? 'static' : 'absolute',
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDragEnter={(e) => {
        const rect = (e.target as HTMLImageElement).getBoundingClientRect();
        setW(e.clientX - rect.x);
        setH(e.clientY - rect.y);
      }}
      onDragEnd={(e) => {
        if(type === 'source' && addOrnament !== undefined) {
          addOrnament({
            name,
            x: e.clientX - w,
            y: e.clientY - h,
          })
        } else if(type === 'static' && onMove !== undefined) {
          onMove(e.clientX - w, e.clientY - h);
        }
      }}
      onDrag={(e) => {
        if(type === 'static' && onMove !== undefined) {
          e.preventDefault();
          if(e.clientX - w >= 0 && e.clientY - h >= 0) {
            onMove(e.clientX - w, e.clientY - h);
          }
        }
      }}
    />
  )
}

export default Ornament;