import { parseMockDataToString } from '@/helpers/parseMockDataToString.js'

export function formatMockData (data) {
  let dataToFormat = data
  if (data.includes('|')) dataToFormat = parseMockDataToString(data)

  const formattedData = []

  dataToFormat.trim().split('-').forEach((row, rowIndex) => {
    formattedData.push([])

    const cardsRow = [...row]

    cardsRow.forEach((cardValue, colIndex) => {
      formattedData[rowIndex].push({
        value: cardValue,
        rowPos: rowIndex + 1,
        colPos: colIndex + 1,
        isCovered: true,
        isEnabled: true,
        isPaired: false
      })
    })
  })

  return formattedData
}
