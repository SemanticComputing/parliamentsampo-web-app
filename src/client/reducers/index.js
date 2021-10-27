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
import items from './ps/items'
import plenarySessions from './ps/plenarySessions'
import speechesFacets from './ps/speechesFacets'
import speechesFacetsConstrainSelf from './ps/speechesFacetsConstrainSelf'
import people from './ps/people'
import peopleFacets from './ps/peopleFacets'
import peopleFacetsConstrainSelf from './ps/peopleFacetsConstrainSelf'
import districts from './ps/districts'
import events from './ps/events'
import groups from './ps/groups'
import occupations from './ps/occupations'
import publications from './ps/publications'
import places from './ps/places'
import terms from './ps/terms'

const reducer = combineReducers({
  speeches,
  speechesFacets,
  speechesFacetsConstrainSelf,
  items,
  plenarySessions,
  people,
  peopleFacets,
  peopleFacetsConstrainSelf,
  districts,
  events,
  groups,
  places,
  occupations,
  publications,
  terms,
  leafletMap,
  animation,
  options,
  error,
  fullTextSearch,
  toastr: toastrReducer
})

export default reducer
