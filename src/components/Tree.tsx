import React from 'react';
import treeImg from '../assets/images/tree.png'

function Tree() {
    return (
      <img
        width={400}
        src={treeImg}
        alt='tree'
        style={{
            pointerEvents: 'none',
        }}
      />
    )
}

export default Tree;