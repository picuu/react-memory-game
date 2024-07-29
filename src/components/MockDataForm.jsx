import { formatMockData } from '@/helpers/formatMockData.js'

export function MockDataForm ({ setMockData }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const { mockData: formData } = Object.fromEntries(new FormData(e.target))
    const newMockData = formatMockData(formData)
    setMockData(newMockData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea name='mockData' id='mockData' rows='6' cols='40' defaultValue='aa-bb' data-testid='mock-data-input' />

      <button type='submit' data-testid='mock-data-submit'>Set mock data</button>
    </form>
  )
}
