import React from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
// import has from 'lodash'
import MainCard from './MainCard'
import { getSpacing } from '../../../helpers/helpers'

const MainSpeeches = props => {
  const { screenSize, layoutConfig, speechesSubPerspectives } = props
  const { mainPage } = layoutConfig
  let headingVariant = 'h5'
  // let subheadingVariant = 'body1'
  let descriptionVariant = 'body1'
  switch (screenSize) {
    case 'xs':
      headingVariant = 'h5'
      // subheadingVariant = 'body1'
      descriptionVariant = 'body1'
      break
    case 'sm':
      headingVariant = 'h4'
      // subheadingVariant = 'h6'
      descriptionVariant = 'h6'
      break
    case 'md':
      headingVariant = 'h3'
      // subheadingVariant = 'h6'
      descriptionVariant = 'h6'
      break
    case 'lg':
      headingVariant = 'h2'
      // subheadingVariant = 'h5'
      descriptionVariant = 'h6'
      break
    case 'xl':
      headingVariant = 'h1'
      // subheadingVariant = 'h4'
      descriptionVariant = 'h6'
      break
  }

  return (
    <Box
      sx={theme => {
        const defaultHeightReduction = layoutConfig.topBar.defaultHeight +
          layoutConfig.footer.defaultHeight + getSpacing(theme, 2)
        const reducedHeightReduction = layoutConfig.topBar.reducedHeight +
          layoutConfig.footer.reducedHeight + getSpacing(theme, 2)
        return {
          paddingBottom: theme.spacing(2),
          height: {
            hundredPercentHeight: `calc(100% - ${reducedHeightReduction}px)`,
            reducedHeight: `calc(100% - ${defaultHeightReduction}px)`
          },
          overflow: {
            hundredPercentHeight: 'auto'
          }
        }
      }}
    >
      <Box
        sx={theme => ({
          background: mainPage.bannerBackround,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: mainPage.bannerMobileHeight,
          [theme.breakpoints.up('md')]: {
            height: mainPage.bannerReducedHeight
          },
          [theme.breakpoints.up('xl')]: {
            height: mainPage.bannerDefaultHeight
          },
          boxShadow: '0 -15px 15px 0px #bdbdbd inset',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        })}
      >
        <Box
          sx={{
            color: '#fff'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Typography component='h1' variant={headingVariant} align='center'>
              {intl.getHTML('speechesMainPage.title')}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={theme => ({
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          [theme.breakpoints.up(800 + getSpacing(theme, 6))]: {
            width: 800,
            marginLeft: 'auto',
            marginRight: 'auto'
          }
        })}
      >
        <Box
          sx={theme => ({
            paddingBottom: theme.spacing(1)
          })}
        >
          <Typography variant={descriptionVariant} color='textPrimary' paragraph>
            {intl.get('speechesMainPage.introText')}
          </Typography>
        </Box>
        <Grid
          container spacing={screenSize === 'sm' ? 2 : 1}
          justifyContent={screenSize === 'xs' || screenSize === 'sm' ? 'center' : 'flex-start'}
        >
          {speechesSubPerspectives.map(perspective => {
            const hideCard = false
            if (!hideCard) {
              return (
                <MainCard
                  key={perspective.id}
                  perspective={perspective}
                  cardHeadingVariant='h5'
                  rootUrl={props.rootUrl}
                />
              )
            }
            return null
          })}
        </Grid>
        <Box
          sx={theme => ({
            marginTop: theme.spacing(1),
            display: 'flex',
            justifyContent: 'center'
          })}
        >
          <Typography
            sx={theme => ({
              marginTop: theme.spacing(0.5),
              fontSize: '0.7em'
            })}
          >
            {intl.getHTML('mainPageImageLicence')}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

MainSpeeches.propTypes = {
  /**
   * An array of objects used for configuration. Each object represents a single perspective.
   */
  speechesSubPerspectives: PropTypes.array.isRequired,
  screenSize: PropTypes.string.isRequired,
  rootUrl: PropTypes.string.isRequired
}

export default MainSpeeches
