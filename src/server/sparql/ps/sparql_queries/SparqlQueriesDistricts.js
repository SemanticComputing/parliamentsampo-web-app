export const districtPropertiesInstancePage =
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
  { 
    SELECT DISTINCT ?id ?person__id ?person__prefLabel ?person__dataProviderUrl ?_time WHERE 
    {
      ?_evt semparls:organization ?id ; a semparls:ElectoralDistrictCandidature .
      ?person__id bioc:bearer_of/crm:P11i_participated_in ?_evt ;
          skos:prefLabel ?person__label .
      OPTIONAL { ?_evt crm:P4_has_time-span ?_time__id . ?_time__id skos:prefLabel ?_time }
      BIND(REPLACE(?person__label, " [(][^)]+[)]$", CONCAT(': ',COALESCE(?_time, ''))) AS ?person__prefLabel)
      BIND(CONCAT("/people/page/", REPLACE(STR(?person__id), "^.*\\\\/(.+)", "$1")) AS ?person__dataProviderUrl)
    } ORDER BY STR(?_time__id)
  }
  UNION
  { 
    SELECT DISTINCT ?id ?other__id ?other__prefLabel ?other__dataProviderUrl WHERE 
    {
      ?person bioc:bearer_of/crm:P11i_participated_in/semparls:organization ?id ;
              bioc:bearer_of/crm:P11i_participated_in ?_evt .
      ?_evt semparls:organization ?other__id ; a semparls:ElectoralDistrictCandidature .
      FILTER (?other__id!=?id)
      ?other__id skos:prefLabel ?other__prefLabel . FILTER(LANG(?other__prefLabel)='fi')
      BIND(CONCAT("/districts/page/", REPLACE(STR(?other__id), "^.*\\\\/(.+)", "$1")) AS ?other__dataProviderUrl)
    } 
    GROUPBY ?id ?other__id ?other__prefLabel ?other__dataProviderUrl 
    ORDERBY DESC(COUNT(DISTINCT ?person))
  }
`
