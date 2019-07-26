import React from 'react';
import './Palette.css';

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

const PaletteItem = ({ color, active, onClick }) => {
  return (
    <div
      className={`PaletteItem ${active? 'active': ''}`}
      style={{ backgroundColor : color }}
      onClick={onClick}
    />
  )
}

const Palette = ({ onSelect, selected }) => {
  return (
    <div className="Palette">
      <h2>Select Color</h2>
      <div className="colors">
        {colors.map((color) => (
          <PaletteItem
            key={color}
            color={color}
            active={selected === color}
            onClick={() => onSelect(color)}
          />
        ))}
      </div>
    </div>
  )
}

export default Palette;
