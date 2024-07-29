'use client'
import './styles/Game.css'
import { useEffect, useState } from 'react'
import { MockDataForm } from '@/components/MockDataForm.jsx'
import { Board } from '@/components/Board.jsx'
import { formatMockData } from '@/helpers/formatMockData.js'

export function Game () {
  const [mockDataFormVisible, setMockDataFormVisible] = useState(false)
  const [mockData, setMockData] = useState(formatMockData('aa-bb'))

  // TODO: getRandomMockData() and use in mockData state

  const handleKeyPress = (e) => {
    if (e.ctrlKey && e.key.toUpperCase() === 'M') {
      setMockDataFormVisible(!mockDataFormVisible)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  return (
    <main>
      <section>
        {mockDataFormVisible && <MockDataForm setMockData={setMockData} />}
      </section>

      <section className='cards'>
        <Board boardData={mockData} />
      </section>
    </main>
  )
}
