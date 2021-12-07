import {
  personPropertiesFacetResults,
  personPropertiesInstancePage
} from '../sparql_queries/SparqlQueriesPeople'
import { prefixes } from '../sparql_queries/SparqlQueriesPrefixes'

export const peopleConfig = {
  endpoint: {
    // url: 'http://localhost:3030/semparl/sparql',
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
      // see semparl text index config: https://version.aalto.fi/gitlab/seco/semparl-data#fuseki-text-query-lucene-index
      // skos:prefLabel is the default property for text:query
      textQueryProperty: '',
      type: 'text'
    },
    home_location: {
      labelPath: 'semparls:home_location',
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
    dateOfDeathTimespan: {
      facetValueFilter: '',
      sortByAscPredicate: 'crm:P100i_died_in/crm:P4_has_time-span/crm:P81a_begin_of_the_begin',
      sortByDescPredicate: 'crm:P100i_died_in/crm:P4_has_time-span/crm:P82b_end_of_the_end',
      predicate: 'crm:P100i_died_in/crm:P4_has_time-span',
      startProperty: 'crm:P81a_begin_of_the_begin',
      endProperty: 'crm:P82b_end_of_the_end',
      type: 'timespan'
    },
    placeOfDeath: {
      facetValueFilter: '',
      labelPath: 'crm:P100i_died_in/crm:P7_took_place_at/skos:prefLabel',
      predicate: 'crm:P100i_died_in/crm:P7_took_place_at',
      type: 'list',
      facetLabelFilter: 'FILTER(LANG(?prefLabel_) = "<LANG>")'
    },
    representativePeriodTimespan: {
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
      predicate: 'bioc:bearer_of/crm:P11i_participated_in ?evt . ?evt a semparls:ParliamentMembership ; crm:P10_falls_within',
      type: 'list',
      facetLabelFilter: 'FILTER(LANG(?prefLabel_) = "<LANG>")'
    },
    party: {
      facetValueFilter: '',
      labelPath: 'semparls:has_party_membership/semparls:party/skos:prefLabel',
      predicate: 'semparls:has_party_membership/semparls:party',
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
    org: {
      id: 'org',
      facetValueFilter: '',
      predicate: 'bioc:bearer_of/crm:P11i_participated_in/semparls:organization',
      labelPath: 'bioc:bearer_of/crm:P11i_participated_in/semparls:organization/skos:prefLabel',
      parentProperty: 'rdfs:subClassOf',
      type: 'hierarchical',
      facetLabelFilter: `
        FILTER(LANG(?prefLabel_) = '<LANG>')
      `
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
