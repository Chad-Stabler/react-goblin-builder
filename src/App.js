import './App.css';
import GoblinForm from './GoblinForm';
import GoblinList from './GoblinList';
import Goblin from './Goblin';
import { useEffect, useState } from 'react';

function App() {
  const [allGoblins, setAllGoblins] = useState([{ name: 'Terry', HP: '3', color: 'lightgreen' }]);
  const [visibleGoblins, setVisibleGoblins] = useState([allGoblins]);
  const [goblinFormName, setGoblinFormName] = useState('');
  const [goblinFormHP, setGoblinFormHP] = useState(0);
  const [goblinFormColor, setGoblinFormColor] = useState('lightgreen');
  const [string, setString] = useState('');

  /* 
    track: 
      allGoblins, an array of all goblins
      visibleGoblins, a second array of goblins: this one is the filtered version of the above allGoblins array
      goblinFormName, which is how we track the user input for the current name of the goblin in the form
      goblinFormHP, which is how we track the user input for the current HP of the goblin in the form
      goblinFormColor, which is how we track the user input for the current color of the goblin in the form
*/
  
  function submitGoblin(e) {
    e.preventDefault();
    const goblin = { name: goblinFormName, HP: goblinFormHP, color: goblinFormColor, };
    // on submit, make a new goblin object with a name that comes from the form state, an hp that comes from the form state, and a color that comes from the form state
    allGoblins.push(goblin);
    // update the allGoblins array. Add the new goblin to the allGoblins array immutably.
    setAllGoblins(allGoblins.slice());
    setGoblinFormColor('lightgreen');
    setGoblinFormHP(0);
    setGoblinFormName('');
    // clear out the goblin form state items by setting them to empty strings. This will cause the form to reset in the UI.
  }

  useEffect(() => {
    setVisibleGoblins(allGoblins);
    setString('');
  }, [allGoblins]);

  function handleDeleteGoblin(name) {
    const index = allGoblins.findIndex(goblin => goblin.name === name);
    // find the index of the goblin in allGoblins with this name
    allGoblins.splice(index, 1);
    // use splice to delete the goblin object at this index
    setAllGoblins([...allGoblins]);
    // update the allGoblins array immutably to this new, smaller array
  }

  function handleFilterGoblins(string) {
    setString(string);
    // use the filter method to get an array of goblins whose name includes this search argument
    const filteredGoblins = (allGoblins.filter(goblin => goblin.name.toLowerCase().includes(string.toLowerCase())));
    string ? setVisibleGoblins(filteredGoblins) : setVisibleGoblins(allGoblins);
    // if there is a search argument, set the visible goblins to the filtered goblins
    // if the search argument is undefined, set the visible goblins in state to just be the array of all goblins
  }


  return (
    <div className="App">
      <div className='current-goblin quarter'>
        <Goblin goblin={{ name: goblinFormName, HP: goblinFormHP, color: goblinFormColor
          /* 
            use the goblin form state to make a goblin object and to display it. 
            This will let the user see the current form state 
          */
        }} />
      </div>
      <div className='goblin-filter quarter'>
        Filter Goblins
        {/* note that handleFilterGoblins is defined upstairs. This is where the allGoblins array gets filtered */}
        <input value={string} onChange={e => handleFilterGoblins(e.target.value)} />
      </div>
      <GoblinForm 
        submitGoblin={submitGoblin} 
        goblinFormName={goblinFormName} 
        setGoblinFormName={setGoblinFormName} 
        goblinFormColor={goblinFormColor} 
        setGoblinFormColor={setGoblinFormColor} 
        goblinFormHP={goblinFormHP} 
        setGoblinFormHP={setGoblinFormHP}
      />
      <GoblinList 
        goblins={visibleGoblins} // this takes in an array of goblins. If the filteredGoblins has a length, use that array. Otherwise, use the allGoblins array 
        handleDeleteGoblin={handleDeleteGoblin} // note that the goblin list has access to the ability to delete
      />
    </div>
  );
}

export default App;
