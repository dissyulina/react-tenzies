import React from "react"
import Die from "./components/Die"

export default function App() {
  return (
    <main>
      <div className="dice-container">
        <Die value="1"/>
      </div>
    </main>
  )
}