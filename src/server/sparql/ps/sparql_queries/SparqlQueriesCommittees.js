export const committeePropertiesInstancePage =
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
    ?id semparls:abbrev ?altLabel .
  }
  UNION
  {
    ?id (a|rdfs:subClassOf)/skos:prefLabel ?type 
    FILTER(LANG(?type)='<LANG>')
  }
  UNION
  {
    ?group__id a ?id ; skos:prefLabel ?group__prefLabel .
     BIND(CONCAT("/groups/page/", REPLACE(STR(?group__id), "^.*\\\\/(.+)", "$1")) AS ?group__dataProviderUrl)
    FILTER(LANG(?group__prefLabel)='<LANG>')
  }
  UNION
  {  ?id ^(bioc:bearer_of/crm:P11i_participated_in/semparls:organization/a) ?person__id .
     ?person__id skos:prefLabel ?person__prefLabel .
    BIND(CONCAT("/people/page/", REPLACE(STR(?person__id), "^.*\\\\/(.+)", "$1")) AS ?person__dataProviderUrl)
  }
`
