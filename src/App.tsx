import React, { useCallback, useEffect, useState } from 'react';
import Ornament from './components/Ornament';
import { OrnamentInfo } from './models/ornament';
import Tree from './components/Tree';
import { NAME_MAPPING } from './utils/ornaments';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Pallette, { PalletteCell } from './components/Pallette';

import ClearButton from './components/ClearButton';
import TrashArea from './components/TrashArea';


function App() {
  const [menuActive, setMenuActive] = useState<boolean>(false);
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

    if(window.context !== undefined) {
      window.context.onActiveChange((status) => {
        setMenuActive(status);
      })
    }
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='container' style={{
        backgroundColor: menuActive ? '#DEA270' : 'transparent',
        height: menuActive ? 850 : 420,
      }}>
        <Tree />

        <ClearButton onClick={() => {
          localStorage.removeItem('save');
          setOrnaments([]);
        }} isActive={menuActive} />

        <TrashArea isActive={menuActive} />

        <Pallette>
          {Object.keys(NAME_MAPPING).map((name) => (
            <PalletteCell key={name}>
              <Ornament type='source' addOrnament={addOrnament} name={name} x={0} y={100} />
            </PalletteCell>
          ))}
        </Pallette>
    
        {
          ornaments.map((o, i) => {
            return (
              <Ornament
                onMove={(x, y) => {
                  setOrnaments(prev => {
                    const newOrn = [...prev];
                    newOrn[i].x = x;
                    newOrn[i].y = y;
                    return newOrn;
                  })
                }}
                type='static'
                addOrnament={addOrnament}
                deleteOrnament={() => {
                  setOrnaments(prev => prev.filter((_, idx) => idx !== i))
                }}
                key={`orn-${i}`}
                name={o.name}
                x={o.x}
                y={o.y}
              />
            )
          })
        }
      </div>
    </DndProvider>
  );
}

export default App;
