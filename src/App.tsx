import React, { useCallback, useEffect, useState } from 'react';
import Ornament from './components/Ornament';
import { OrnamentInfo } from './models/ornament';
import Tree from './components/Tree';
import { NAME_MAPPING } from './utils/ornaments';


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
    <div className="container" style={{
      backgroundColor: '#DEA270',
    }}>
      <Tree />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(10, 1fr)'
      }}>
        {Object.keys(NAME_MAPPING).map((name) => (
          <Ornament key={name} type='source' addOrnament={addOrnament} name={name} x={0} y={100} />
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
  );
}

export default App;
