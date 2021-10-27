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
            id: 'uri',
            valueType: 'object',
            makeLink: true,
            externalLink: true,
            sortValues: true,
            numberedList: false
        },
        {
            id: 'prefLabel',
            valueType: 'object',
            makeLink: false,
            externalLink: false,
            sortValues: true,
            numberedList: false
        },

        // {
        //   id: 'altLabel',
        //   valueType: 'string',
        //   makeLink: false,
        //   externalLink: false,
        //   sortValues: true,
        //   numberedList: false,
        //   minWidth: 170
        // },
        {
            id: 'parliamentarySession',
            valueType: 'object',
            makeLink: false,
            externalLink: false,
            sortValues: true,
            numberedList: false
        },
        {
            id: 'date',
            valueType: 'string',
            makeLink: false,
            externalLink: false,
            sortValues: false,
            numberedList: false
        },
        {
            id: 'transcript',
            valueType: 'object',
            makeLink: false,
            externalLink: false,
            sortValues: false,
            numberedList: false
        },
        // {
        //   id: 'governmentProposal',
        //   valueType: 'object',
        //   makeLink: false,
        //   externalLink: false,
        //   sortValues: true,
        //   numberedList: false
        // },
        // {
        //   id: 'speech',
        //   valueType: 'object',
        //   makeLink: true,
        //   externalLink: false,
        //   sortValues: true,
        //   numberedList: true
        // },
        // {

    ]
}

const resultClasses = new Set([
    'plenarySessions'
])

const plenarySessions = (state = INITIAL_STATE, action) => {
    if (resultClasses.has(action.resultClass)) {
        return handleDataFetchingAction(state, action)
    } else return state
}

export default plenarySessions
