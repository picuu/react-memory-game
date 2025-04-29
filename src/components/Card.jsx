'use client'
import './styles/Card.css'

const CARD_COLORS = {
  a: 'crimson',
  b: 'gold',
  c: 'lime',
  d: 'aqua',
  e: 'blueviolet',
  f: 'hotpink'
}

export function Card ({ cardValue, rowPos, colPos, isCovered, isEnabled, isPaired, onClick }) {
  const handleClick = (e) => {
    onClick(rowPos, colPos)
  }

  return (
    <article
      data-testid={`card card-row${rowPos}-col${colPos}`}
      className={`card${isCovered ? ' covered' : ''}${isEnabled ? '' : ' disabled'}`}
      style={{ color: isCovered ? 'transparent' : CARD_COLORS[cardValue] }}
      onClick={handleClick}
    >
      {cardValue}
    </article>
  )
}
