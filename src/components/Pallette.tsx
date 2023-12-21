import React from 'react';

interface PalletteProps {
    children?: React.ReactNode;
}

function Pallette({ children }: PalletteProps) {
    return (
        <div className='grid-container'>
          {children}
        </div>
    )
}

export function PalletteCell({ children }: PalletteProps) {
    return (
        <div className='grid-item'>{children}</div>
    )
}

export default Pallette;
