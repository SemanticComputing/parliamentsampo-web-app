import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import purple from '@material-ui/core/colors/purple'
import PerspectiveTabs from '../../main_layout/PerspectiveTabs'
import InstanceHomePageTable from '../../main_layout/InstanceHomePageTable'
// import Network from '../../facet_results/Network'
// import ApexChart from '../../facet_results/ApexChart'
// import Export from '../../facet_results/Export'
// import Recommendations from './Recommendations'
// import { coseLayout, cytoscapeStyle, preprocess } from '../../../configs/sampo/Cytoscape.js/NetworkConfig'
// import { createMultipleLineChartData } from '../../../configs/sampo/ApexCharts/LineChartConfig'
import { Route, Redirect } from 'react-router-dom'
import { has } from 'lodash'

const styles = () => ({
  root: {
    width: '100%',
    height: '100%'
  },
  content: props => ({
    padding: 0,
    width: '100%',
    height: `calc(100% - ${props.layoutConfig.tabHeight}px)`,
    overflow: 'auto'
  }),
  spinnerContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

/**
 * A component for generating a landing page for a single entity.
 */
class InstanceHomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      localID: null
    }
  }

  componentDidMount = () => this.fetchTableData()

  componentDidUpdate = prevProps => {
    // handle the case when the TABLE tab was not originally active
    const prevPathname = prevProps.routeProps.location.pathname
    const currentPathname = this.props.routeProps.location.pathname
    if (!this.hasTableData() && prevPathname !== currentPathname && currentPathname.endsWith('table')) {
      this.fetchTableData()
    }
    // handle browser's back button
    const localID = this.getLocalIDFromURL()
    if (this.state.localID !== localID) {
      this.fetchTableData()
    }
  }

  hasTableData = () => {
    const { instanceTableData } = this.props.perspectiveState
    return instanceTableData !== null && Object.values(instanceTableData).length >= 1
  }

  fetchTableData = () => {
    const { perspectiveConfig } = this.props
    const localID = this.getLocalIDFromURL()
    this.setState({ localID })
    let uri = ''
    const base = 'http://ldf.fi/semparl'
    const resultClass = perspectiveConfig.id
    switch (resultClass) {
      case 'speeches':
        uri = `${base}/speeches/${localID}`
        break
      case 'people':
        uri = `${base}/people/${localID}`
        break
      case 'districts':
        uri = `${base}/groups/districts/${localID}`
        break
      case 'events':
        uri = `${base}/events/${localID}`
        break
      case 'groups':
        uri = `${base}/groups/${localID}`
        break
      case 'occupations':
        uri = `${base}/occupations/${localID}`
        break
      case 'places':
        uri = `http://sws.geonames.org/${localID}/`
        break
      case 'publications':
        uri = `${base}/publications/${localID}`
        break
      case 'terms':
        uri = `${base}/times/electoral-terms/${localID}`
        break
      case 'items':
        uri = `${base}/items/${localID}`
        break
      case 'plenarySessions':
        uri = `${base}/times/plenary-sessions/${localID}`
        break
      case 'documents':
        uri = `${base}/documents/${localID}`
        break
      case 'interruptions':
        uri = `${base}/speeches/${localID}`
        break
    }
    this.props.fetchByURI({
      resultClass,
      facetClass: null,
      variant: null,
      uri: uri
    })
  }

  getLocalIDFromURL = () => {
    const locationArr = this.props.routeProps.location.pathname.split('/')
    let localID = locationArr.pop()
    this.props.perspectiveConfig.instancePageTabs.map(tab => {
      if (localID === tab.id) {
        localID = locationArr.pop() // pop again if tab id
      }
    })
    return localID
  }

  getVisibleRows = rows => {
    const { instanceTableData } = this.props.perspectiveState
    const visibleRows = []
    const instanceClass = instanceTableData.type ? instanceTableData.type.id : ''
    rows.map(row => {
      if ((has(row, 'onlyForClass') && row.onlyForClass === instanceClass) ||
        !has(row, 'onlyForClass')) {
        visibleRows.push(row)
      }
    })
    return visibleRows
  }

  render = () => {
    const { classes, perspectiveState, perspectiveConfig, rootUrl, screenSize, layoutConfig } = this.props
    const { instanceTableData, fetching } = perspectiveState
    const resultClass = perspectiveConfig.id
    const hasTableData = this.hasTableData()
    return (
      <div className={classes.root}>
        <PerspectiveTabs
          routeProps={this.props.routeProps}
          tabs={perspectiveConfig.instancePageTabs}
          screenSize={screenSize}
          layoutConfig={layoutConfig}
        />
        <Paper square className={classes.content}>
          {fetching && !hasTableData &&
            <div className={classes.spinnerContainer}>
              <CircularProgress style={{ color: purple[500] }} thickness={5} />
            </div>}
          {!hasTableData &&
            <div className={classes.spinnerContainer}>
              <Typography variant='h6'>
                No data found for id: <span style={{ fontStyle: 'italic' }}>{this.state.localID}</span>
              </Typography>
            </div>}
          {/* make sure that tableData exists before rendering any components */}
          {hasTableData &&
            <>
              <Route
                exact path={`${rootUrl}/${resultClass}/page/${this.state.localID}`}
                render={() => <Redirect to={`${rootUrl}/${resultClass}/page/${this.state.localID}/table`} />}
              />
              <Route
                path={[`${rootUrl}/${resultClass}/page/${this.state.localID}/table`, '/iframe.html']} // support also rendering in Storybook
                render={() =>
                  <InstanceHomePageTable
                    resultClass={resultClass}
                    data={instanceTableData}
                    properties={this.getVisibleRows(perspectiveState.properties)}
                    screenSize={screenSize}
                  />}
              />
              <Route
                path={`${rootUrl}/${resultClass}/page/${this.state.localID}/personEvents`}
                render={() =>
                  <InstanceHomePageTable
                    resultClass={resultClass}
                    resultClassVariant='personEvents'
                    fetchResultsWhenMounted
                    data={perspectiveState.results ? perspectiveState.results[0] : null}
                    resultUpdateID={perspectiveState.resultUpdateID}
                    fetchResults={this.props.fetchResults}
                    uri={instanceTableData.id}
                    layoutConfig={layoutConfig}
                    properties={[
                      {
                        id: 'prefLabel',
                        valueType: 'object',
                        makeLink: false,
                        externalLink: false,
                        sortValues: true,
                        numberedList: false,
                        onlyOnInstancePage: true
                      },
                      {
                        id: 'event',
                        valueType: 'object',
                        makeLink: false,
                        externalLink: false,
                        sortValues: false,
                        numberedList: true,
                        containerClass: 'ten',
                        minWidth: 220,
                        onlyOnInstancePage: true
                      },
                      {
                        id: 'uri',
                        valueType: 'object',
                        makeLink: true,
                        externalLink: true,
                        sortValues: false,
                        numberedList: true,
                        containerClass: 'three',
                        minWidth: 220,
                        onlyOnInstancePage: true
                      }
                    ]}
                  />}
              />
              <Route
                path={`${rootUrl}/${resultClass}/page/${this.state.localID}/personSpeeches`}
                render={() =>
                  <InstanceHomePageTable
                    resultClass={resultClass}
                    resultClassVariant='personSpeeches'
                    fetchResultsWhenMounted
                    data={perspectiveState.results ? perspectiveState.results[0] : null}
                    resultUpdateID={perspectiveState.resultUpdateID}
                    fetchResults={this.props.fetchResults}
                    uri={instanceTableData.id}
                    layoutConfig={layoutConfig}
                    properties={[
                      {
                        id: 'prefLabel',
                        valueType: 'object',
                        makeLink: false,
                        externalLink: false,
                        sortValues: true,
                        numberedList: false,
                        onlyOnInstancePage: true
                      },
                      {
                        id: 'event',
                        valueType: 'object',
                        makeLink: true,
                        externalLink: false,
                        sortValues: false,
                        numberedList: true,
                        containerClass: 'ten',
                        minWidth: 220,
                        onlyOnInstancePage: true
                      },
                      {
                        id: 'uri',
                        valueType: 'object',
                        makeLink: true,
                        externalLink: true,
                        sortValues: false,
                        numberedList: true,
                        containerClass: 'three',
                        minWidth: 220,
                        onlyOnInstancePage: true
                      }
                    ]}
                  />}
              />
            </>}
        </Paper>
      </div>
    )
  }
}

InstanceHomePage.propTypes = {
  /**
   * Faceted search configs and results of this perspective.
   */
  perspectiveState: PropTypes.object.isRequired,
  /**
    * Leaflet map config and external layers.
    */
  leafletMapState: PropTypes.object.isRequired,
  /**
    * Redux action for fetching paginated results.
    */
  fetchPaginatedResults: PropTypes.func.isRequired,
  /**
    * Redux action for fetching all results.
    */
  fetchResults: PropTypes.func.isRequired,
  /**
    * Redux action for fetching facet values for statistics.
    */
  fetchFacetConstrainSelf: PropTypes.func.isRequired,
  /**
    * Redux action for loading external GeoJSON layers.
    */
  fetchGeoJSONLayers: PropTypes.func.isRequired,
  /**
    * Redux action for loading external GeoJSON layers via backend.
    */
  fetchGeoJSONLayersBackend: PropTypes.func.isRequired,
  /**
    * Redux action for clearing external GeoJSON layers.
    */
  clearGeoJSONLayers: PropTypes.func.isRequired,
  /**
    * Redux action for fetching information about a single entity.
    */
  fetchByURI: PropTypes.func.isRequired,
  /**
    * Redux action for updating the page of paginated results.
    */
  updatePage: PropTypes.func.isRequired,
  /**
    * Redux action for updating the rows per page of paginated results.
    */
  updateRowsPerPage: PropTypes.func.isRequired,
  /**
    * Redux action for sorting the paginated results.
    */
  sortResults: PropTypes.func.isRequired,
  /**
    * Redux action for updating the active selection or config of a facet.
    */
  showError: PropTypes.func.isRequired,
  /**
    * Redux action for showing an error
    */
  updateFacetOption: PropTypes.func.isRequired,
  /**
    * Routing information from React Router.
    */
  routeProps: PropTypes.object.isRequired,
  /**
    * Perspective config.
    */
  perspective: PropTypes.object.isRequired,
  /**
    * State of the animation, used by TemporalMap.
    */
  animationValue: PropTypes.array.isRequired,
  /**
    * Redux action for animating TemporalMap.
    */
  animateMap: PropTypes.func.isRequired,
  /**
    * Current screen size.
    */
  screenSize: PropTypes.string.isRequired,
  /**
    * Root url of the application.
    */
  rootUrl: PropTypes.string.isRequired,
  layoutConfig: PropTypes.object.isRequired
}

export const InstanceHomePageComponent = InstanceHomePage

export default withStyles(styles)(InstanceHomePage)
