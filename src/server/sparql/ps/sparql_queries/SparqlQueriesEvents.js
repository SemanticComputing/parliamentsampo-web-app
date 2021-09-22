export const eventPropertiesInstancePage =
` 
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__dataProviderUrl)
  BIND(?id as ?uri__prefLabel)

  {
    ?id skos:prefLabel ?prefLabel__id .
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
    FILTER(LANG(?prefLabel__prefLabel)='<LANG>')
  }
  UNION
  {
    ?id skos:altLabel ?altLabel
  }
  UNION
  {
    ?id a/skos:prefLabel ?type 
    FILTER(LANG(?type)='<LANG>')
  }
  UNION
  {
    ?id crm:P4_has_time-span/skos:prefLabel ?timespan
  }
  UNION
  {
    ?id crm:P10_falls_within/skos:prefLabel ?period .
    FILTER(LANG(?period)='<LANG>')
  }
  UNION
  { # https://dev.parlamenttisampo.fi/fi/events/page/e3028040393270193031/table
    # Check also the occupations by role
    ?id bioc:has_occupation ?occupation__id .
    ?occupation__id skos:prefLabel ?occupation__prefLabel .
    FILTER(LANG(?occupation__prefLabel)='<LANG>')
    BIND(CONCAT("/occupations/page/", REPLACE(STR(?occupation__id), "^.*\\\\/(.+)", "$1")) AS ?occupation__dataProviderUrl)
  }
  UNION
  {
    ?id semparls:school/skos:prefLabel ?organization 
  }
  UNION
  {
    ?id semparls:organization ?group__id .
    ?group__id skos:prefLabel ?group__prefLabel .
    FILTER(LANG(?group__prefLabel)='<LANG>')
    BIND(CONCAT("/groups/page/", REPLACE(STR(?group__id), "^.*\\\\/(.+)", "$1")) AS ?group__dataProviderUrl)
  }
  UNION
  {
    SELECT DISTINCT ?id ?person__id ?person__prefLabel ?person__dataProviderUrl 
    WHERE {
      ?id ^crm:P11i_participated_in ?role__id .
      ?person__id bioc:bearer_of ?role__id ;
                  xl:prefLabel/skos:prefLabel ?_label .
      ?role__id skos:prefLabel ?role__label . FILTER(LANG(?role__label)='<LANG>')
      OPTIONAL { ?id crm:P4_has_time-span [ skos:prefLabel ?_date ; crm:P81a_begin_of_the_begin ?_start ] }
      BIND(CONCAT(?_label, ' (', ?role__label, ')') AS ?person__prefLabel)
      BIND(CONCAT("/people/page/", REPLACE(STR(?person__id), "^.*\\\\/(.+)", "$1")) AS ?person__dataProviderUrl)
    } ORDER BY ?_start ?_label
  }
  UNION
  {
    ?person__id semparls:has_education ?id ;
        skos:prefLabel ?person__prefLabel .
        BIND(CONCAT("/people/page/", REPLACE(STR(?person__id), "^.*\\\\/(.+)", "$1")) AS ?person__dataProviderUrl)
  }
`
