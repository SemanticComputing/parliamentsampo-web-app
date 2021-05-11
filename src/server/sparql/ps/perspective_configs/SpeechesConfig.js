import {
  speechPropertiesFacetResults,
  speechPropertiesInstancePage
} from '../sparql_queries/SparqlQueriesSpeeches'
import { prefixes } from '../sparql_queries/SparqlQueriesPrefixes'

export const speechesConfig = {
  endpoint: {
    url: 'http://ldf.fi/semparl/sparql',
    prefixes,
    useAuth: true
  },
  facetClass: 'semparls:Speech',
  includeInSitemap: true,
  // defaultConstraint: `
  //   <SUBJECT> dct:source mmm-schema:Bibale .
  // `,
  paginatedResults: {
    properties: speechPropertiesFacetResults
  },
  instance: {
    properties: speechPropertiesInstancePage,
    relatedInstances: '',
    defaultTab: 'table'
  },
  facets: {
    prefLabel: {
      id: 'prefLabel',
      labelPath: 'skos:prefLabel',
      textQueryPredicate: '', // empty for querying the facetClass
      textQueryProperty: 'skos:prefLabel', // limit only to prefLabels
      type: 'text'
    },
    speaker: {
      id: 'speaker',
      facetValueFilter: '',
      labelPath: 'semparls:speaker/skos:prefLabel',
      predicate: 'semparls:speaker',
      type: 'list'
    }
  }
}
