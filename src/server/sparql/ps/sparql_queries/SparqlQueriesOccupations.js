export const occupationPropertiesInstancePage =
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
    ?id skos:altLabel ?altLabel .
  }
  UNION
  {
    { ?person__id bioc:has_occupation ?id ; a bioc:Person }
    UNION
    { ?person__id semparls:has_education/bioc:has_occupation ?id ; a bioc:Person }
    ?person__id skos:prefLabel ?person__prefLabel .    
    BIND(CONCAT("/people/page/", REPLACE(STR(?person__id), "^.*\\\\/(.+)", "$1")) AS ?person__dataProviderUrl)
  }
  UNION
  { 
    SELECT ?id ?related__id ?related__prefLabel ?related__dataProviderUrl 
      WHERE {
        ?id ^bioc:has_occupation ?person__id .
        ?person__id bioc:has_occupation ?related__id ; a bioc:Person .
        FILTER(?related__id != ?id)
        ?related__id skos:prefLabel ?related__prefLabel .
        FILTER(LANG(?related__prefLabel)='<LANG>')
        BIND(CONCAT("/occupations/page/", REPLACE(STR(?related__id), "^.*\\\\/(.+)", "$1")) AS ?related__dataProviderUrl)
      } 
      GROUPBY ?id ?related__id ?related__prefLabel ?related__dataProviderUrl 
      ORDER BY DESC (COUNT(?person__id))
    }
  UNION
  {
    ?id crm:P10_falls_within/skos:prefLabel ?period .
    FILTER(LANG(?period)='<LANG>')
  }
`
