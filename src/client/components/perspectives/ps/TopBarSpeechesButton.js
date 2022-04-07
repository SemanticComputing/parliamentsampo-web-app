import React from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import withStyles from '@mui/styles/withStyles'
import { Link } from 'react-router-dom'

const styles = theme => ({
  link: {
    textDecoration: 'none'
  },
  appBarButton: {
    color: 'white !important',
    border: `1px solid ${theme.palette.primary.main}`
  }
})

class TopBarInfoButton extends React.Component {
  state = {
    anchorEl: null
  };

  AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

  handleInfoMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget })
  };

  handleInfoMenuClose = () => {
    this.setState({ anchorEl: null })
  };

  renderDropdownItem = perspective =>
    <MenuItem
      key={perspective.id}
      component={this.AdapterLink}
      to={`${this.props.rootUrl}/${perspective.id}/${perspective.searchMode}`}
      onClick={this.handleInfoMenuClose}
    >
      {intl.get(`perspectives.${perspective.id}.shortLabel`)}
    </MenuItem>

  render () {
    const { classes, speechesSubPerspectives } = this.props
    return (
      <>
        <Button
          className={classes.appBarButton}
          aria-haspopup='true'
          onClick={this.handleInfoMenuOpen}
          endIcon={<ExpandMoreIcon />}
        >
          {intl.get('topBar.speechesDropdown.speeches')}
        </Button>
        <Menu
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleInfoMenuClose}
        >
          {speechesSubPerspectives.map(perspective => this.renderDropdownItem(perspective))}
        </Menu>
      </>
    )
  }
}

TopBarInfoButton.propTypes = {
  classes: PropTypes.object.isRequired,
  rootUrl: PropTypes.string.isRequired
}

export default withStyles(styles)(TopBarInfoButton)
