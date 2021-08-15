import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
// general reducers:
import error from './general/error'
import options from './general/options'
import animation from './general/animation'
import leafletMap from './general/leafletMap'
// portal spefic reducers:
import fullTextSearch from './ps/fullTextSearch'
import speeches from './ps/speeches'
import speechesFacets from './ps/speechesFacets'
import speechesFacetsConstrainSelf from './ps/speechesFacetsConstrainSelf'
import people from './ps/people'
import peopleFacets from './ps/peopleFacets'
import peopleFacetsConstrainSelf from './ps/peopleFacetsConstrainSelf'
import events from './ps/events'
import groups from './ps/groups'
import occupations from './ps/occupations'
import places from './ps/places'

const reducer = combineReducers({
  speeches,
  speechesFacets,
  speechesFacetsConstrainSelf,
  people,
  peopleFacets,
  peopleFacetsConstrainSelf,
  events,
  groups,
  places,
  occupations,
  leafletMap,
  animation,
  options,
  error,
  fullTextSearch,
  toastr: toastrReducer
})

export default reducer
