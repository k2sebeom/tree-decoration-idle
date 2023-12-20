import React, { useCallback, useState } from 'react';
import treeImg from './assets/images/tree.png'
import Ornament from './components/Ornament';
import { OrnamentInfo } from './models/ornament';


function App() {
  const [ornaments, setOrnaments] = useState<OrnamentInfo[]>([]);

  const addOrnament = useCallback((o: OrnamentInfo): void => {
    setOrnaments(prev => [...prev, o]);
  }, [setOrnaments])

  return (
    <div className="container" style={{
      backgroundColor: '#DEA270',
    }}>
      <img
        width={400}
        src={treeImg}
        alt='tree'
      />

      <Ornament type='source' addOrnament={addOrnament} name='cane1' x={0} y={100} />

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
