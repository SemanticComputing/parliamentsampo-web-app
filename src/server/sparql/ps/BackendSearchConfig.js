import { speechesConfig } from './perspective_configs/SpeechesConfig'
import { peopleConfig } from './perspective_configs/PeopleConfig'
import { makeObjectList } from '../SparqlObjectMapper'
import { fullTextSearchProperties } from './sparql_queries/SparqlQueriesFullText'
import { sitemapInstancePageQuery } from '../SparqlQueriesGeneral'
import {
  personEventsQuery
} from './sparql_queries/SparqlQueriesPeople'

export const backendSearchConfig = {
  speeches: speechesConfig,
  people: peopleConfig,
  personEvents: {
    perspectiveID: 'people',
    q: personEventsQuery,
    resultMapper: makeObjectList
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
