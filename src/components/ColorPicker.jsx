import React, { useState } from 'react';

const colors = [
  '#e5b52d', '#a43e3e', '#3f6844', '#345291', '#dbc9a6',
  '#4996cf', '#56275d', '#b35329', '#4b4b4b'
];


export default function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState(null);

  return (
    <div className="py-6 w-[100%]">
      <h2 className="text-[38px] font-semibold mb-6">Tap the Color You Want</h2>
      <div className="w-[100%] h-100 grid grid-cols-6 grid-rows-2 gap-3">
        {colors.map((color, index) => (
          <div
            key={index}
            onClick={() => setSelectedColor((prev)=>color == prev ? null : color)}
            className={`rounded cursor-pointer transition-transform duration-150 ${
              selectedColor === color ? 'ring-4 ring-black scale-105' : ''
            } ${['#e5b52d','#dbc9a6'].includes(color) ? 'row-span-2' : ''} ${color == "#3f6844" ? 'col-span-2' : ''}`}
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </div>
    </div>
  );
}
