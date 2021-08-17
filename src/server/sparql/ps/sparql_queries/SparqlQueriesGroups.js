export const groupPropertiesInstancePage =
` 
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__dataProviderUrl)
  BIND(?id as ?uri__prefLabel)

  {
    ?id skos:prefLabel ?prefLabel__id .
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
    FILTER(LANG(?prefLabel__prefLabel)='fi')
  }
  UNION
  {
    ?id skos:altLabel ?altLabel .
  }
  UNION
  { SELECT DISTINCT ?id ?person__id ?person__prefLabel ?person__dataProviderUrl 
    WHERE {
      ?id ^semparls:organization ?evt .
      ?person__id bioc:bearer_of/crm:P11i_participated_in ?evt ;
                  xl:prefLabel/skos:prefLabel ?_label .
      OPTIONAL { ?evt crm:P4_has_time-span [ skos:prefLabel ?_date ; crm:P81a_begin_of_the_begin ?_start ] }
      BIND(CONCAT(?_label, ' (', COALESCE(?_date, ''), ')') AS ?person__prefLabel)
      BIND(CONCAT("/people/page/", REPLACE(STR(?person__id), "^.*\\\\/(.+)", "$1")) AS ?person__dataProviderUrl)
    } ORDER BY ?_start ?_label
  }
  UNION
  {
    ?id crm:P10_falls_within/skos:prefLabel ?period .
    FILTER(LANG(?period)='fi')
  }
`
