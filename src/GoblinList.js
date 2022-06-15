import React from 'react';
import Goblin from './Goblin';

export default function GoblinList({ goblins, handleDeleteGoblin }) {
  return (
    <div className='goblin-list quarter'>
      {
        goblins.map((goblin, i) => <Goblin key={goblin.name + i} handleDeleteGoblin={handleDeleteGoblin} name={goblin.name} HP={goblin.HP} color={goblin.color} />)
      }
      {/* map over your goblins and render out a Goblin component for each goblin. You've seen this before. The only difference here is that you need to pass handleDeleteGoblin (a prop that is a function), as well */}
    </div>
  );
}
