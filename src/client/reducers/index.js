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
import places from './ps/places'

const reducer = combineReducers({
  speeches,
  speechesFacets,
  speechesFacetsConstrainSelf,
  places,
  leafletMap,
  animation,
  options,
  error,
  fullTextSearch,
  toastr: toastrReducer
})

export default reducer
