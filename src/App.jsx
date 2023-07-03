import { useState } from 'react'
import './index.css'
import { Die } from './components/Die'


function App() {

  const [dice, setDice] = useState(allNewDice());

  const diceElements = dice.map((dieNum, index) => <Die key={index} value={dieNum} />)
      
  function allNewDice() {
    const newDice = [];
    for(let n = 0; n < 10; n++){
      newDice.push(Math.ceil(Math.random() * 6));
    }
    // console.log(newDice);
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
