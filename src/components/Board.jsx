import { useState, useRef, useEffect } from 'react'
import './styles/Board.css'
import { Card } from '@/components/Card.jsx'

export function Board ({ boardData }) {
  const [cardsBoard, setCardsBoard] = useState(boardData)
  const uncoveredCards = useRef(0)
  const [lastUncoveredCard, setLastUncoveredCard] = useState(null)

  useEffect(() => {
    setCardsBoard(boardData)
  }, [boardData])

  const handleClick = (rowPos, colPos) => {
    const newCardsBoard = [...cardsBoard]
    const clickedCard = newCardsBoard[rowPos - 1][colPos - 1]

    if (clickedCard.isPaired) return
    if (!clickedCard.isEnabled) return
    if (uncoveredCards.current === 2) return

    clickedCard.isCovered = false
    clickedCard.isEnabled = false
    uncoveredCards.current++

    if (lastUncoveredCard !== null && lastUncoveredCard.value === clickedCard.value) {
      clickedCard.isPaired = true
      lastUncoveredCard.isPaired = true
    }

    setLastUncoveredCard(clickedCard)
    setCardsBoard(newCardsBoard)
  }

  const coverAllCards = () => {
    const newCardsBoard = [...cardsBoard]
    newCardsBoard.forEach(row => {
      row.forEach(card => {
        if (!card.isPaired) {
          card.isCovered = true
          card.isEnabled = true
        }
      })
    })
    setCardsBoard(newCardsBoard)
  }

  useEffect(() => {
    if (uncoveredCards.current === 2) {
      setTimeout(() => {
        coverAllCards()
        uncoveredCards.current = 0
        setLastUncoveredCard(null)
      }, 1000)
    }
  }, [uncoveredCards.current])

  return (
    <div className='board' data-testid='board'>
      {
        cardsBoard.map((row, rowIndex) => (
          <div className='board-row' key={`row${rowIndex}`} data-testid={`board-row-${rowIndex}`}>
            {
              row.map((card, colIndex) => (
                <Card
                  key={`${rowIndex}-${colIndex}`}
                  cardValue={card.value}
                  rowPos={card.rowPos}
                  colPos={card.colPos}
                  isCovered={card.isCovered}
                  isEnabled={card.isEnabled}
                  isPaired={card.isPaired}
                  onClick={handleClick}
                />
              ))
            }
          </div>
        ))
      }
    </div>
  )
}
