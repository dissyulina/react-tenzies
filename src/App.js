import React from "react"
import Confetti from 'react-confetti'
import Die from "./components/Die"
import {nanoid} from "nanoid"

export default function App() {
  const [newDice, setNewDice] = React.useState(allNewDice())
  const [tenzies,setTenzies] = React.useState(false)

  function generateNewDie() {
    return {
      value: Math.floor( Math.random() * 6 ) + 1,
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for(let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false)
      setNewDice(allNewDice())
    } else {
      setNewDice(prevDice => prevDice.map(die => {
        return die.isHeld === true ?
          die : generateNewDie()
      }))
    }
    
  }

  function holdDice(id) {
    setNewDice(prevDice => prevDice.map(die => {
      return die.id === id ? 
        {...die, isHeld: !die.isHeld} : die
    }))
  }
  
  const dieElements = newDice.map(die => (
    <Die 
      value={die.value} 
      key={die.id} 
      isHeld={die.isHeld} 
      id={die.id} 
      holdDice={() => holdDice(die.id)}
    />
  ))

  React.useEffect(() => {
    const allIsHeld = newDice.every(die => die.isHeld)
    const firstValue = newDice[0].value
    const allSameValue = newDice.every(die => die.value === firstValue)
    if (allIsHeld && allSameValue) {
      setTenzies(true)
      console.log("You won!")
    }
  }, [newDice])

  return (
    <main className="background">
      <div className="main-container">
        {tenzies && <Confetti width="800px" height="400px"/>}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {dieElements}
        </div>
        <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll Dice"}</button>
      </div>
    </main>
  )
}