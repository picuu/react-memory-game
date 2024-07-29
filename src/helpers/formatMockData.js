import { parseMockDataToString } from '@/helpers/parseMockDataToString.js'

export function formatMockData (data) {
  let dataToFormat = data
  if (data.includes('|')) dataToFormat = parseMockDataToString(data)

  const formattedData = dataToFormat.trim().split('-').map(row => [...row])
  return formattedData
}
