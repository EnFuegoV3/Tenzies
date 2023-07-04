import { useState } from 'react'
import './index.css'
import { Die } from './components/Die'
import { nanoid } from 'nanoid';


function App() {

  const [dice, setDice] = useState(allNewDice());
console.log(dice)
  const diceElements = dice.map((die, index) => <Die key={index} value={die.value} />)
      
  function allNewDice() {
    const newDice = [];
    for(let n = 0; n < 10; n++){
      newDice.push({value: Math.ceil(Math.random() * 6), isHeld: false});
    }
    
    return newDice;
  }

  function rollDice(){
    setDice(allNewDice())
  }  
  
  return (
    <main>
      <div className='die-container'>
        {diceElements}
      </div>
      <button className='roll-dice' onClick={rollDice}>Roll</button>
    </main>
  )
}

export default App
