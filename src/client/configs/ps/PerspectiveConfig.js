import React from 'react'
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay'
import CalendarToday from '@material-ui/icons/CalendarToday'
// import TripOriginIcon from '@material-ui/icons/TripOrigin'
// import LocationOnIcon from '@material-ui/icons/LocationOn'
// import AddLocationIcon from '@material-ui/icons/AddLocation'
import KeyboardVoice from '@material-ui/icons/KeyboardVoice'
import Portrait from '@material-ui/icons/Portrait'
// import RedoIcon from '@material-ui/icons/Redo'
// import PieChartIcon from '@material-ui/icons/PieChart'
// import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import BubbleChartIcon from '@material-ui/icons/BubbleChart'
import LineChartIcon from '@material-ui/icons/ShowChart'
import eventsImage from '../../img/main_page/events-452x262.jpg'
import actorsImage from '../../img/main_page/actors-452x262_2.jpg'

export const perspectiveConfig = [
  {
    id: 'speeches',
    frontPageImage: eventsImage,
    perspectiveDescHeight: 160,
    defaultActiveFacets: new Set([]),
    tabs: [
      {
        id: 'table',
        value: 0,
        icon: <CalendarViewDayIcon />
      }
    ],
    instancePageTabs: [
      {
        id: 'table',
        value: 0,
        icon: <CalendarViewDayIcon />
      }
    ]
  },
  {
    id: 'people',
    frontPageImage: actorsImage,
    perspectiveDescHeight: 160,
    defaultActiveFacets: new Set([]),
    tabs: [
      {
        id: 'table',
        value: 0,
        icon: <Portrait />
      },
      {
        id: 'by_age',
        value: 1,
        icon: <LineChartIcon />
      }
    ],
    instancePageTabs: [
      {
        id: 'table',
        value: 0,
        icon: <Portrait />
      },
      {
        id: 'personEvents',
        value: 1,
        icon: <CalendarToday />
      },
      {
        id: 'personSpeeches',
        value: 2,
        icon: <KeyboardVoice />
      },
      {
        id: 'network',
        value: 3,
        icon: <BubbleChartIcon />
      }, 
    ]
  }
]
