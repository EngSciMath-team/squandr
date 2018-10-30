// TODO set up a node server with mongo db
import banks from './json/banks.json'
import corporations from './json/corporations.json'
import governmentExpenditure from './json/government-expenditure.json'
import potentialCosts from './json/potential-costs.json'

export default function () {
  const dataObject = { banks, corporations, governmentExpenditure, potentialCosts }
  const dataKeys = Object.keys(dataObject)
  const dataArray = dataKeys.map(type => {
    const entries = dataObject[type]
    const entriesWithType = entries.map(entry => {
      entry.type = type
      return entry
    })
    return entriesWithType
  })

  return [].concat(...dataArray)
}
