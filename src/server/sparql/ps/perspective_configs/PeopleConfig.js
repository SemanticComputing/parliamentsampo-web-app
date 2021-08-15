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
      labelPath: 'semparls:sortingLabel',
      textQueryPredicate: '', // empty for querying the facetClass
      textQueryProperty: 'skos:prefLabel', // limit only to prefLabels
      type: 'text'
    },
    dateOfBirthTimespan: {
      facetValueFilter: '',
      sortByAscPredicate: 'crm:P98i_was_born/crm:P4_has_time-span/crm:P81a_begin_of_the_begin',
      sortByDescPredicate: 'crm:P98i_was_born/crm:P4_has_time-span/crm:P82b_end_of_the_end',
      predicate: 'crm:P98i_was_born/crm:P4_has_time-span',
      startProperty: 'crm:P81a_begin_of_the_begin',
      endProperty: 'crm:P82b_end_of_the_end',
      type: 'timespan'
    },
    placeOfBirth: {
      facetValueFilter: '',
      labelPath: 'crm:P98i_was_born/crm:P7_took_place_at/skos:prefLabel',
      predicate: 'crm:P98i_was_born/crm:P7_took_place_at',
      type: 'list',
      facetLabelFilter: 'FILTER(LANG(?prefLabel_) = "<LANG>")'
    },
    representativePeriod: {
      facetValueFilter: '',
      sortByAscPredicate: 'semparls:representative_period/crm:P81a_begin_of_the_begin',
      sortByDescPredicate: 'semparls:representative_period/crm:P82b_end_of_the_end',
      predicate: 'semparls:representative_period',
      startProperty: 'crm:P81a_begin_of_the_begin',
      endProperty: 'crm:P82b_end_of_the_end',
      type: 'timespan'
    },
    electoralTerm: {
      facetValueFilter: '',
      labelPath: 'bioc:bearer_of/crm:P11i_participated_in/crm:P10_falls_within/skos:prefLabel',
      predicate: 'bioc:bearer_of/crm:P11i_participated_in/crm:P10_falls_within',
      type: 'list',
      facetLabelFilter: 'FILTER(LANG(?prefLabel_) = "<LANG>")'
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
    datasource: {
      facetValueFilter: '',
      labelPath: 'dct:source/a/skos:prefLabel',
      predicate: 'dct:source/a',
      type: 'list',
      facetLabelFilter: 'FILTER(LANG(?prefLabel_) = "<LANG>")'
    },
    image: {
      labelPath: 'sch:image'
    }
  }
}
