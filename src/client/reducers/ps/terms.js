import { handleDataFetchingAction } from '../general/results'

export const INITIAL_STATE = {
  results: null,
  resultUpdateID: 0,
  resultsSparqlQuery: null,
  paginatedResults: [],
  paginatedResultsSparqlQuery: null,
  resultCount: 0,
  page: -1,
  pagesize: 10,
  sortBy: null,
  sortDirection: null,
  fetching: false,
  fetchingResultCount: false,
  fetchingInstanceAnalysisData: false,
  facetedSearchHeaderExpanded: false,
  instancePageHeaderExpanded: false,
  instanceTableData: null,
  instanceTableExternalData: null,
  instanceAnalysisData: null,
  instanceAnalysisDataUpdateID: 0,
  instanceSparqlQuery: null,
  properties: [
    {
      id: 'prefLabel',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      minWidth: 170
    },
    {
      id: 'timespan',
      valueType: 'string',
      makeLink: false,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      minWidth: 170
    },
    {
      id: 'group',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: true,
      numberedList: true,
      onlyOnInstancePage: true
    },
    {
      id: 'member',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: true,
      numberedList: true,
      onlyOnInstancePage: true
    },
    {
      id: 'session',
      valueType: 'object',
      makeLink: false,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      onlyOnInstancePage: true
    },
    { id: 'related',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: true,
      numberedList: true,
      onlyOnInstancePage: true
    },
    {
      id: 'exlink',
      valueType: 'object',
      makeLink: true,
      externalLink: true,
      sortValues: true,
      numberedList: true,
      onlyOnInstancePage: true
    },
    {
      id: 'uri',
      valueType: 'object',
      makeLink: true,
      externalLink: true,
      sortValues: true,
      numberedList: false
    }
  ]
}

const resultClasses = new Set([
  'terms'
])

const terms = (state = INITIAL_STATE, action) => {
  if (resultClasses.has(action.resultClass)) {
    return handleDataFetchingAction(state, action)
  } else return state
}

export default terms
