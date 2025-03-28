"use client"
import React from 'react';

const SeekBar = () => {
  const price = 50 // Initial value of the seekbar

  return (
    <div>
     <p>{price}</p>
      <input
        type="range"
        min="0"
        max="100"
        value={price}
        style={{ width: '100%' }}
      />
      
    </div>
  );
};

export default SeekBar;