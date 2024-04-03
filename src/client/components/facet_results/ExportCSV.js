import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { stateToUrl } from '../../helpers/helpers'
import intl from 'react-intl-universal'

const apiUrl = process.env.API_URL

const styles = theme => ({
  root: {
    height: 'calc(100% - 72px)',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTop: '1px solid rgba(224, 224, 224, 1);',
    flexDirection: "column"
  },
  link: {
    textDecoration: 'none'
  },
  button: {
    margin: theme.spacing(3)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  }
})

/**
 * A component for creating a link for downloading raw facet results in CSV format.
 */
class ExportCSV extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      downloadLink: ''
    }
  }

  componentDidMount = () => {
    this.setState({ downloadLink: this.createDownloadLink() })
  }

  componentDidUpdate = prevProps => {
    // check if filters have changed
    if (prevProps.facetUpdateID !== this.props.facetUpdateID) {
      this.setState({ downloadLink: this.createDownloadLink() })
    }
  }

  createDownloadLink = () => {
    const params = stateToUrl({
      facetClass: this.props.facetClass,
      facets: this.props.facets
    })
    // console.log(params.constraints)
    let constraints = params.constraints ? `&constraints=${encodeURIComponent(JSON.stringify(params.constraints))}` : ''
    constraints = constraints.replace('*', '%2A') // temporary solution for a bug - may still be unable to download some text searches with special characters
    constraints = constraints.replace('(', '%28')
    constraints = constraints.replace(')', '%29')
    constraints = constraints.replace('!', '%21')
    return `${apiUrl}/faceted-search/${this.props.resultClass}/all?facetClass=${this.props.facetClass}&resultFormat=csv${constraints}`
  }

  render = () => {
    const { classes } = this.props

    return (
      <Paper square className={classes.root}>
        <div>
        <a
          className={classes.link}
          href={this.state.downloadLink}
          download
        >
          <Button variant='contained' color='primary' className={classes.button}>
            Export CSV
          </Button>
        </a>
        </div>
        <div>
          {intl.getHTML(`csvDownload.${this.props.facetClass}`)}
          {intl.getHTML(`csvDownloadInfo.${this.props.facetClass}`)}
        </div>
      </Paper>
    )
  }
}

ExportCSV.propTypes = {
  classes: PropTypes.object.isRequired,
  resultClass: PropTypes.string.isRequired,
  facetClass: PropTypes.string.isRequired,
  facets: PropTypes.object.isRequired,
  facetUpdateID: PropTypes.number.isRequired
}

export const ExportCSVComponent = ExportCSV

export default withStyles(styles)(ExportCSV)
