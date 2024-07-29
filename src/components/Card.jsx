'use client'
import './styles/Card.css'
import { useState } from 'react'

export function Card ({ cardValue, rowPos, colPos }) {
  const [isCellCovered, setIsCellCovered] = useState(true)

  const handleClick = (e) => {
    setIsCellCovered(!isCellCovered)
  }

  return (
    <article
      data-testid={`card card-row${rowPos}-col${colPos}`}
      className={`card ${isCellCovered ? 'covered' : ''}`}
      onClick={handleClick}
    >
      {cardValue}
    </article>
  )
}
