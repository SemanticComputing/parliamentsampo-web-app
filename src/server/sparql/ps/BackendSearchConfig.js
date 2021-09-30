import { speechesConfig } from './perspective_configs/SpeechesConfig'
import { peopleConfig } from './perspective_configs/PeopleConfig'
import { makeObjectList } from '../SparqlObjectMapper'
import { fullTextSearchProperties } from './sparql_queries/SparqlQueriesFullText'
import { sitemapInstancePageQuery } from '../SparqlQueriesGeneral'
import {
  personEventsQuery,
  personSpeechesQuery,
  ageQuery
} from './sparql_queries/SparqlQueriesPeople'
import { districtPropertiesInstancePage } from './sparql_queries/SparqlQueriesDistricts'
import { itemPropertiesInstancePage } from './sparql_queries/SparqlQueriesSpeeches'
import { eventPropertiesInstancePage } from './sparql_queries/SparqlQueriesEvents'
import { groupPropertiesInstancePage } from './sparql_queries/SparqlQueriesGroups'
import { occupationPropertiesInstancePage } from './sparql_queries/SparqlQueriesOccupations'
import { placePropertiesInstancePage } from './sparql_queries/SparqlQueriesPlaces'
import { publicationPropertiesInstancePage } from './sparql_queries/SparqlQueriesPublications'
import { termPropertiesInstancePage} from './sparql_queries/SparqlQueriesTerms'
import { mapMultipleLineChart } from '../Mappers'

export const backendSearchConfig = {
  speeches: speechesConfig,
  people: peopleConfig,
  personEvents: {
    perspectiveID: 'people',
    q: personEventsQuery,
    resultMapper: makeObjectList
  },
  items: {
    perspectiveID: 'speeches',
    instance: {
      properties: itemPropertiesInstancePage,
      relatedInstances: ''
    }
  },
  personSpeeches: {
    perspectiveID: 'people',
    q: personSpeechesQuery,
    resultMapper: makeObjectList
  },
  personAges: {
    perspectiveID: 'people',
    q: ageQuery,
    filterTarget: 'person__id',
    resultMapper: mapMultipleLineChart,
    resultMapperConfig: {
      fillEmptyValues: true
    }
  },
  districts: {
    perspectiveID: 'people',
    instance: {
      properties: districtPropertiesInstancePage,
      relatedInstances: ''
    }
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
  places: {
    perspectiveID: 'people',
    instance: {
      properties: placePropertiesInstancePage,
      relatedInstances: ''
    }
  },
  publications: {
    perspectiveID: 'people',
    instance: {
      properties: publicationPropertiesInstancePage,
      relatedInstances: ''
    }
  },
  terms: {
    perspectiveID: 'people',
    instance: {
      properties: termPropertiesInstancePage,
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
