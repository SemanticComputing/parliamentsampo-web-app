import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import PerspectiveTabs from '../../main_layout/PerspectiveTabs'
import ReactVirtualizedTable from '../../facet_results/ReactVirtualizedTable'
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay'

const rootStyle = {
  height: 'calc(100% - 8px)',
  marginTop: 8,
  marginLeft: 8,
  marginRight: 8
}

/**
 * A component for displaying full text search results.
 */
const FullTextSearch = props => {
  const { rootUrl } = props
  const perspectiveUrl = `${rootUrl}/full-text-search`
  return (
    <div style={rootStyle}>
      <PerspectiveTabs
        routeProps={props.routeProps}
        screenSize={props.screenSize}
        tabs={[{
          id: 'table',
          label: 'table',
          icon: <CalendarViewDayIcon />,
          value: 0
        }]}
      />
      <Route
        exact path={perspectiveUrl}
        render={() => <Redirect to={`${perspectiveUrl}/table`} />}
      />
      <Route
        path={`${perspectiveUrl}/table`}
        render={() => {
          return (
            <ReactVirtualizedTable
              fullTextSearch={props.fullTextSearch}
              sortFullTextResults={props.sortFullTextResults}
            />
          )
        }}
      />
    </div>
  )
}

FullTextSearch.propTypes = {
  fullTextSearch: PropTypes.object.isRequired,
  routeProps: PropTypes.object.isRequired,
  screenSize: PropTypes.string.isRequired,
  rootUrl: PropTypes.string.isRequired
}

export default FullTextSearch
