'use client'
import { useState } from 'react'
import { formatMockData } from '@/helpers/formatMockData.js'

export function MockDataForm ({ setMockData }) {
  const [inputValue, setInputValue] = useState('aa-bb')

  const handleInputChange = (e) => {
    const newInputValue = e.target.value
    setInputValue(newInputValue)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newMockData = formatMockData(inputValue)
    setMockData(newMockData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea name='mockData' id='mockData' rows='6' cols='40' value={inputValue} onChange={handleInputChange} data-testid='mock-data-input' />

      <button type='submit' data-testid='mock-data-submit'>Set mock data</button>
    </form>
  )
}
