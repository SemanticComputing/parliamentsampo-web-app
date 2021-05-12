import { speechesConfig } from './perspective_configs/SpeechesConfig'
import { peopleConfig } from './perspective_configs/PeopleConfig'
import { fullTextSearchProperties } from './sparql_queries/SparqlQueriesFullText'
import { sitemapInstancePageQuery } from '../SparqlQueriesGeneral'

export const backendSearchConfig = {
  speeches: speechesConfig,
  people: peopleConfig,
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
