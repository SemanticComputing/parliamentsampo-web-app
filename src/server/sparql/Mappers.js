import { has } from 'lodash'
import { getTreeFromFlatData } from '@nosferatu500/react-sortable-tree'

export const mapPlaces = sparqlBindings => {
  const results = sparqlBindings.map(b => {
    return {
      id: b.id.value,
      lat: b.lat.value,
      long: b.long.value,
      ...(Object.prototype.hasOwnProperty.call(b, 'instanceCount') && { instanceCount: b.instanceCount.value })
    }
  })
  return results
}

export const mapCoordinates = sparqlBindings => {
  const results = sparqlBindings.map(b => {
    return {
      lat: b.lat.value,
      long: b.long.value
    }
  })
  return results
}

export const mapCount = sparqlBindings => {
  return sparqlBindings[0].count.value
}

export const mapFacet = (sparqlBindings, previousSelections) => {
  let results = []
  if (sparqlBindings.length > 0) {
    results = mapFacetValues(sparqlBindings)
  }
  return results
}

export const mapHierarchicalFacet = (sparqlBindings, previousSelections) => {
  const results = mapFacetValues(sparqlBindings)
  let treeData = getTreeFromFlatData({
    flatData: results,
    getKey: node => node.id, // resolve a node's key
    getParentKey: node => node.parent, // resolve node's parent's key
    rootKey: '0' // The value of the parent key when there is no parent (i.e., at root level)
  })
  treeData = recursiveSortAndSelectChildren(treeData)
  return ({
    treeData,
    flatData: results
  })
}

export const mapTimespanFacet = sparqlBindings => {
  const b = sparqlBindings[0]
  return {
    min: b.min.value,
    max: b.max.value
  }
}

export const mapNameSampoResults = sparqlBindings => {
  const results = sparqlBindings.map(b => {
    return {
      id: b.id.value,
      prefLabel: b.prefLabel.value.charAt(0).toUpperCase() + b.prefLabel.value.slice(1), // capitalize
      modifier: has(b, 'modifier') ? b.modifier.value : '-',
      basicElement: has(b, 'basicElement') ? b.basicElement.value : '-',
      typeLabel: has(b, 'typeLabel') ? b.typeLabel.value : '-',
      broaderTypeLabel: has(b, 'broaderTypeLabel') ? b.broaderTypeLabel.value : '-',
      collector: has(b, 'collector') ? b.collector.value : '-',
      broaderAreaLabel: has(b, 'broaderAreaLabel') ? b.broaderAreaLabel.value : '-',
      collectionYear: has(b, 'collectionYear') ? b.collectionYear.value : '-',
      source: has(b, 'source') ? b.source.value : '-',
      markerColor: has(b, 'markerColor') ? b.markerColor.value : '-',
      namesArchiveLink: has(b, 'namesArchiveLink') ? b.namesArchiveLink.value : '-',
      positioningAccuracy: has(b, 'positioningAccuracy') ? b.positioningAccuracy.value : '-',
      ...(Object.prototype.hasOwnProperty.call(b, 'lat') && { lat: b.lat.value }),
      ...(Object.prototype.hasOwnProperty.call(b, 'long') && { long: b.long.value })
    }
  })
  return results
}

export const mapLineChart = ({ sparqlBindings, config }) => {
  const seriesData = []
  const categoriesData = []
  const sparqlBindingsLength = sparqlBindings.length
  sparqlBindings.map((b, index, bindings) => {
    const currentCategory = parseInt(b.category.value)
    const currentValue = parseInt(b.count.value)
    seriesData.push(currentValue)
    categoriesData.push(
      config && config.xAxisConverter
        ? config.xAxisConverter(currentCategory)
        : currentCategory
    )
    if (config && config.fillEmptyValues && index + 1 < sparqlBindingsLength) {
      let categoryIter = currentCategory
      const nextNonZeroCategory = parseInt(bindings[index + 1].category.value)
      // add zeros until we reach the next category with a non zero value
      while (categoryIter < nextNonZeroCategory - 1) {
        categoryIter += 1
        seriesData.push(0)
        categoriesData.push(
          config && config.xAxisConverter
            ? config.xAxisConverter(categoryIter)
            : categoryIter
        )
      }
    }
  })
  return {
    seriesData,
    categoriesData
  }
}

export const mapMultipleLineChart = ({ sparqlBindings, config }) => {
  const res = {}
  sparqlBindings.forEach(b => {
    for (const p in b) {
      if (p !== 'category') {
        res[p] = []
      }
    }
  })
  const category = sparqlBindings.map(p => parseFloat(p.category.value))

  if (config && config.fillEmptyValues) {
    //  fill the missing years with zeroes
    const valmax = Math.max(...category)
    for (var i = Math.min(...category); i <= valmax; i++) {
      for (const p in res) {
        if (p !== 'category') {
          res[p][i] = 0
        }
      }
    }
  }

  //  read the known years into the data object
  sparqlBindings.forEach(b => {
    for (const p in b) {
      if (p !== 'category') {
        res[p][parseFloat(b.category.value)] = parseFloat(b[p].value)
      }
    }
  })

  // sort by year and remove empty sequence at start and end
  for (const p in res) {
    var arr = Object.entries(res[p])
      .map(p => [parseFloat(p[0]), p[1]])
      .sort((a, b) => ((a[0] < b[0]) ? -1 : ((a[0] > b[0]) ? 1 : 0)))
    res[p] = trimResult(arr)
  }
  return res
}

export const mapPieChart = sparqlBindings => {
  const results = sparqlBindings.map(b => {
    return {
      category: b.category.value,
      prefLabel: b.prefLabel.value,
      instanceCount: b.instanceCount.value
    }
  })
  return results
}

export const linearScale = ({ data, config }) => {
  const { variable, minAllowed, maxAllowed } = config
  const length = data.length
  const min = data[length - 1][variable]
  const max = data[0][variable]
  data.forEach(item => {
    if (item[variable]) {
      const unscaledNum = item[variable]
      // https://stackoverflow.com/a/31687097
      item[`${variable}Scaled`] = (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed
    }
  })
}

/* Data processing as in:
*  https://github.com/apexcharts/apexcharts.js/blob/master/samples/vue/area/timeseries-with-irregular-data.html
*  Trim zero values from array start and end
*/
const trimResult = arr => {
  //  trim start of array
  let i = 0
  while (i < arr.length && arr[i][1] === 0) i++

  //  end of array
  let j = arr.length - 1
  while (i < j && arr[j][1] === 0) j--

  return arr.slice(i, j + 1)
}

const mapFacetValues = sparqlBindings => {
  const results = sparqlBindings.map(b => {
    try {
      return {
        id: b.id.value,
        prefLabel: b.prefLabel
          ? b.prefLabel.value
          : '0', // temporary prefLabel for <http://ldf.fi/MISSING_VALUE> to support sorting
        selected: b.selected.value,
        parent: b.parent ? b.parent.value : null,
        instanceCount: b.instanceCount.value
      }
    } catch (err) {
      console.log(err)
    }
  })
  return results
}

const comparator = (a, b) => {
  if (Array.isArray(a.prefLabel)) {
    a.prefLabel = a.prefLabel[0]
  }
  if (Array.isArray(b.prefLabel)) {
    b.prefLabel = b.prefLabel[0]
  }
  return a.prefLabel.localeCompare(b.prefLabel)
}

const recursiveSortAndSelectChildren = nodes => {
  nodes.sort(comparator)
  nodes.forEach(node => {
    if (has(node, 'children')) {
      for (const child of node.children) {
        if (node.selected === 'true') {
          child.selected = 'true'
          child.disabled = 'true'
        }
      }
      recursiveSortAndSelectChildren(node.children)
    }
  })
  return nodes
}
