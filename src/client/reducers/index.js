import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
// general reducers:
import error from './general/error'
import options from './general/options'
import animation from './general/animation'
import leafletMap from './general/leafletMap'
// portal spefic reducers:
import fullTextSearch from './ps/fullTextSearch'
import clientSideFacetedSearch from './ps/clientSideFacetedSearch'
import perspective1 from './ps/perspective1' // copy of manuscripts
import perspective2 from './ps/perspective2' // copy of works
import perspective3 from './ps/perspective3' // copy of events
import perspective1Facets from './ps/perspective1Facets'
import perspective1FacetsConstrainSelf from './ps/perspective1FacetsConstrainSelf'
import perspective2Facets from './ps/perspective2Facets'
import perspective2FacetsConstrainSelf from './ps/perspective2FacetsConstrainSelf'
import perspective3Facets from './ps/perspective3Facets'
import perspective3FacetsConstrainSelf from './ps/perspective3FacetsConstrainSelf'
import places from './ps/places'

const reducer = combineReducers({
  perspective1,
  perspective2,
  perspective3,
  perspective1Facets,
  perspective1FacetsConstrainSelf,
  perspective2Facets,
  perspective2FacetsConstrainSelf,
  perspective3Facets,
  perspective3FacetsConstrainSelf,
  places,
  leafletMap,
  animation,
  options,
  error,
  clientSideFacetedSearch,
  fullTextSearch,
  toastr: toastrReducer
})

export default reducer
