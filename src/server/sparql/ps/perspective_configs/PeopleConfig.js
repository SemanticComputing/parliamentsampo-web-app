import {
  personPropertiesFacetResults,
  personPropertiesInstancePage
} from '../sparql_queries/SparqlQueriesPeople'
import { prefixes } from '../sparql_queries/SparqlQueriesPrefixes'

export const peopleConfig = {
  endpoint: {
    url: 'http://ldf.fi/semparl/sparql',
    prefixes,
    useAuth: true
  },
  facetClass: 'bioc:Person',
  langTag: 'fi',
  includeInSitemap: true,
  // defaultConstraint: `
  //   <SUBJECT> dct:source mmm-schema:Bibale .
  // `,
  paginatedResults: {
    properties: personPropertiesFacetResults
  },
  instance: {
    properties: personPropertiesInstancePage,
    relatedInstances: '',
    defaultTab: 'table'
  },
  facets: {
    prefLabel: {
      labelPath: 'skos:prefLabel',
      textQueryPredicate: '', // empty for querying the facetClass
      textQueryProperty: 'skos:prefLabel', // limit only to prefLabels
      type: 'text'
    },
    party: {
      facetValueFilter: '',
      labelPath: 'semparls:party/skos:prefLabel',
      predicate: 'semparls:party',
      type: 'list',
      facetLabelFilter: 'FILTER(LANG(?prefLabel_) = "<LANG>")'
    },
    occupation: {
      facetValueFilter: '',
      labelPath: 'bioc:has_occupation/skos:prefLabel',
      predicate: 'bioc:has_occupation',
      type: 'list',
      facetLabelFilter: 'FILTER(LANG(?prefLabel_) = "<LANG>")'
    },
    gender: {
      facetValueFilter: '',
      labelPath: 'bioc:has_gender/skos:prefLabel',
      predicate: 'bioc:has_gender',
      type: 'list',
      facetLabelFilter: 'FILTER(LANG(?prefLabel_) = "<LANG>")'
    },
    birthplace: {
      facetValueFilter: '',
      labelPath: 'crm:P98i_was_born/crm:P7_took_place_at/skos:prefLabel',
      predicate: 'crm:P98i_was_born/crm:P7_took_place_at',
      type: 'list',
      facetLabelFilter: 'FILTER(LANG(?prefLabel_) = "<LANG>")'
    }
  }
}
