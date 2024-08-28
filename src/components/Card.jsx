'use client'
import './styles/Card.css'

export function Card ({ cardValue, rowPos, colPos, isCovered, onClick }) {
  const handleClick = (e) => {
    onClick(rowPos, colPos)
  }

  return (
    <article
      data-testid={`card card-row${rowPos}-col${colPos}`}
      className={`card ${isCovered ? 'covered' : ''}`}
      onClick={handleClick}
    >
      {cardValue}
    </article>
  )
}
