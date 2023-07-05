import { useEffect, useState } from 'react'
import './index.css'
import { Die } from './components/Die'
import { nanoid } from 'nanoid';
import { ConfettiElement } from './components/ConfettiElement';

function App() {

  const [dice, setDice] = useState(allNewDice());
  
  const [tenzies, setTenzies] = useState(false)

  // useEffect(() => {
  //   dice.every(element => {
  //     if((element.value === dice[0].value) && (element.isHeld === true)) {
  //       setTenzies(true);
  //       console.log("you won")
  //     }
  //   })
  // }, [dice])

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue){
      setTenzies(true)
      console.log("You Won!")
    }
  }, [dice])

  function holdDice(id){
    setDice(prevDie => prevDie.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
     }))
   }
      
   function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6), 
      isHeld: false, 
      id: nanoid()}
  } 

  function allNewDice() {
    const newDice = [];
    for(let n = 0; n < 10; n++){
      newDice.push(generateNewDie());
    }
    
    return newDice;
  }

  function rollDice(){
    const allHeld = dice.every(die => die.isHeld)
    if(allHeld) {
      setTenzies(false)
      return setDice(allNewDice())
    } else {
    setDice(prevDice => prevDice.map(die => {
      return !die.isHeld ? generateNewDie() : die
    }))}
  }  

  

  const diceElements = dice.map((die) => <Die 
                                            key={die.id} 
                                            value={die.value} 
                                            isHeld={die.isHeld}
                                            holdDice={() => holdDice(die.id)}
                                            id={die.id}
                                          />)

  
  return (
    <main>
      {tenzies && <ConfettiElement />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='die-container'>
        {diceElements}
      </div>
      <button className='roll-dice' onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
