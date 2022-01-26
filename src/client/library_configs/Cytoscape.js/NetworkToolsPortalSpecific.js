import { preprocessPagerank, ValueScaler, ColorScaler } from './NetworkToolsGeneral'

export const preprocessParliamentSampoPeopleNetwork = elements => {
  preprocessPagerank(elements)

  // nodes
  let arr = elements.nodes.map(ele => ele.data.distance)

  // node size
  let res = (new ColorScaler('26px', '12px')).fitTransform(arr)
  elements.nodes.forEach((ele, i) => { ele.data.size = res[i] })

  //  label size
  res = (new ValueScaler(12, 8)).fitTransform(arr)
  elements.nodes.forEach((ele, i) => { ele.data.font_size = res[i] })

  //  edges
  arr = elements.edges.map(ele => ele.data.weight)

  //  edge width
  res = (new ValueScaler(2.0, 8.0)).fitTransform(arr)
  elements.edges.forEach((ele, i) => { ele.data.weight = res[i] })

  //  node border width
  elements.nodes.forEach(ele => {
    ele.data.border_width = (ele.data.distance === 0) ? '2px' : '0px'
  })
}
