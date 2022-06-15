import React from 'react';

export default function Goblin({ name, HP, color, handleDeleteGoblin }) {
  return (
    // be sure you take a look at this component i'm handing you and figure out what props it will need to work correctly.
    <div 
      className='goblin' 
      onClick={() => handleDeleteGoblin && handleDeleteGoblin(name)}>
      <h3>{name}</h3>  
      <img src="goblin.png" style={{ backgroundColor: color }} />
      <p>{HP} HP</p>
    </div>
  );
}
