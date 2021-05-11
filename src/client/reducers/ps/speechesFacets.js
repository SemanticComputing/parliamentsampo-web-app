import { handleFacetAction } from '../general/facets'

export const INITIAL_STATE = {
  updatedFacet: null,
  facetUpdateID: 0,
  updatedFilter: null,
  facets: {
    prefLabel: {
      id: 'prefLabel',
      // predicate: defined in backend
      distinctValueCount: 0,
      values: [],
      flatValues: [],
      sortBy: null,
      sortDirection: null,
      sortButton: false,
      spatialFilterButton: false,
      isFetching: false,
      searchField: false,
      containerClass: 'one',
      filterType: 'textFilter',
      textFilter: null
    },
    speaker: {
      id: 'speaker',
      // predicate: defined in backend
      distinctValueCount: 0,
      values: [],
      flatValues: [],
      sortBy: 'instanceCount',
      sortDirection: 'desc',
      sortButton: true,
      spatialFilterButton: false,
      pieChartButton: false,
      isFetching: false,
      searchField: true,
      containerClass: 'ten',
      filterType: 'uriFilter',
      uriFilter: null
    },
    party: {
      id: 'party',
      // predicate: defined in backend
      distinctValueCount: 0,
      values: [],
      flatValues: [],
      sortBy: 'instanceCount',
      sortDirection: 'desc',
      sortButton: true,
      spatialFilterButton: false,
      pieChartButton: false,
      isFetching: false,
      searchField: true,
      containerClass: 'ten',
      filterType: 'uriFilter',
      uriFilter: null
    },
    speechType: {
      id: 'speechType',
      // predicate: defined in backend
      distinctValueCount: 0,
      values: [],
      flatValues: [],
      sortBy: 'instanceCount',
      sortDirection: 'desc',
      sortButton: true,
      spatialFilterButton: false,
      pieChartButton: false,
      isFetching: false,
      searchField: true,
      containerClass: 'ten',
      filterType: 'uriFilter',
      uriFilter: null
    },
    language: {
      id: 'language',
      // predicate: defined in backend
      distinctValueCount: 0,
      values: [],
      flatValues: [],
      sortBy: 'instanceCount',
      sortDirection: 'desc',
      sortButton: true,
      spatialFilterButton: false,
      pieChartButton: false,
      isFetching: false,
      searchField: true,
      containerClass: 'ten',
      filterType: 'uriFilter',
      uriFilter: null
    }
  }
}

const speechesFacets = (state = INITIAL_STATE, action) => {
  if (action.facetClass === 'speeches') {
    return handleFacetAction(state, action, INITIAL_STATE)
  } else return state
}

export default speechesFacets
