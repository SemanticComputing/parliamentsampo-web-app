import { speechesConfig } from './perspective_configs/SpeechesConfig'
import { peopleConfig } from './perspective_configs/PeopleConfig'
import { makeObjectList } from '../SparqlObjectMapper'
import { fullTextSearchProperties } from './sparql_queries/SparqlQueriesFullText'
import { sitemapInstancePageQuery } from '../SparqlQueriesGeneral'
import {
  personEventsQuery,
  personSpeechesQuery
} from './sparql_queries/SparqlQueriesPeople'
import { eventPropertiesInstancePage } from './sparql_queries/SparqlQueriesEvents'
import { groupPropertiesInstancePage } from './sparql_queries/SparqlQueriesGroups'
import { occupationPropertiesInstancePage } from './sparql_queries/SparqlQueriesOccupations'

export const backendSearchConfig = {
  speeches: speechesConfig,
  people: peopleConfig,
  personEvents: {
    perspectiveID: 'people',
    q: personEventsQuery,
    resultMapper: makeObjectList
  },
  personSpeeches: {
    perspectiveID: 'people',
    q: personSpeechesQuery,
    resultMapper: makeObjectList
  },
  events: {
    perspectiveID: 'people',
    instance: {
      properties: eventPropertiesInstancePage,
      relatedInstances: ''
    }
  },
  groups: {
    perspectiveID: 'people',
    instance: {
      properties: groupPropertiesInstancePage,
      relatedInstances: ''
    }
  },
  occupations: {
    perspectiveID: 'people',
    instance: {
      properties: occupationPropertiesInstancePage,
      relatedInstances: ''
    }
  },
  jenaText: {
    perspectiveID: 'speeches',
    properties: fullTextSearchProperties
  },
  sitemapConfig: {
    baseUrl: 'https://sampo-ui.demo.seco.cs.aalto.fi',
    langPrimary: 'en',
    langSecondary: 'fi',
    outputDir: './src/server/sitemap_generator/sitemap_output',
    sitemapUrl: 'https://sampo-ui.demo.seco.cs.aalto.fi/sitemap',
    sitemapInstancePageQuery
  }
}
