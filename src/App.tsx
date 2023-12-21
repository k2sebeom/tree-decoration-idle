import React, { useCallback, useEffect, useState } from 'react';
import Ornament from './components/Ornament';
import { OrnamentInfo } from './models/ornament';
import Tree from './components/Tree';
import { NAME_MAPPING } from './utils/ornaments';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


function App() {
  const [ornaments, setOrnaments] = useState<OrnamentInfo[]>([]);

  const addOrnament = useCallback((o: OrnamentInfo): void => {
    setOrnaments(prev => [...prev, o]);
  }, [setOrnaments])

  useEffect(() => {
    if(ornaments.length > 0) {
      localStorage.setItem('save', JSON.stringify(ornaments));
    }
  }, [ornaments]);

  useEffect(() => {
    const cache = localStorage.getItem('save');
    if(cache !== null) {
      setOrnaments(JSON.parse(cache));
    }
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{
        backgroundColor: '#DEA270',
      }}>
        <Tree />

        <div className='grid-container'>
          {Object.keys(NAME_MAPPING).map((name) => (
            <div className='grid-item' key={name}>
              <Ornament type='source' addOrnament={addOrnament} name={name} x={0} y={100} />
            </div>
          ))}
        </div>
    
        {
          ornaments.map((o, i) => {
            return (
              <Ornament onMove={(x, y) => {
                setOrnaments(prev => {
                  const newOrn = [...prev];
                  newOrn[i].x = x;
                  newOrn[i].y = y;
                  return newOrn;
                })
              }} type='static' addOrnament={addOrnament} key={`orn-${i}`} name={o.name} x={o.x} y={o.y} />
            )
          })
        }
      </div>
    </DndProvider>
  );
}

export default App;
