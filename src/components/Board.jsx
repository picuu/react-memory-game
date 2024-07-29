import './styles/Board.css'
import { Card } from '@/components/Card.jsx'

export function Board ({ boardData }) {
  return (
    <div className='board' data-testid='board'>
      {
        boardData.map((row, rowIndex) => (
          <div className='board-row' key={`row${rowIndex}`} data-testid={`board-row-${rowIndex}`}>
            {
              row.map((card, colIndex) => (
                <Card
                  key={`${rowIndex}-${colIndex}`}
                  cardValue={card}
                  rowPos={rowIndex + 1}
                  colPos={colIndex + 1}
                />
              ))
            }
          </div>
        ))
      }
    </div>
  )
}
