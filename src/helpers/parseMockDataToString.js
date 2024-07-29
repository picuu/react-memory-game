export function parseMockDataToString (data) {
  let strData = data.split(/\r?\n/).join('-')
  strData = strData.replaceAll(' ', '')
  strData = strData.replaceAll('|', '')
  while (strData[strData.length - 1] === '-') {
    strData = strData.slice(0, -1)
  }
  return strData
}
