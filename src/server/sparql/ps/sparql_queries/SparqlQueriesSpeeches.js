const perspectiveID = 'speeches'

export const speechPropertiesInstancePage =
` 
  # ?id skos:prefLabel ?prefLabel__id . 
  BIND(?id as ?prefLabel__id )
  BIND (?prefLabel__id as ?prefLabel__prefLabel)
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__dataProviderUrl)
  BIND(?id as ?uri__prefLabel)
  {
    ?id semparls:speaker ?speaker__id .
    ?speaker__id skos:prefLabel ?speaker__prefLabel .
    BIND(CONCAT("/people/page/", REPLACE(STR(?speaker__id), "^.*\\\\/(.+)", "$1")) AS ?speaker__dataProviderUrl)
  }
  UNION
  {
    ?id semparls:party ?party__id .
    ?party__id skos:prefLabel ?party__prefLabel .
    FILTER(LANG(?party__prefLabel) = "<LANG>")
  }
  UNION
  {
    ?id semparls:speechType ?speechType__id .
    # ?speechType__id skos:prefLabel ?speechType__prefLabel .
    BIND(?speechType__id as ?speechType__prefLabel)
  }
  UNION
  {
    ?id dct:language ?language
  }
`

export const speechPropertiesFacetResults =
` # ?id skos:prefLabel ?prefLabel__id . 
  BIND(?id as ?prefLabel__id )
  BIND (?prefLabel__id as ?prefLabel__prefLabel)
  BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__dataProviderUrl)
  BIND(?id as ?uri__prefLabel)
  {
    ?id semparls:speaker ?speaker__id .
    ?speaker__id skos:prefLabel ?speaker__prefLabel .
    BIND(CONCAT("/people/page/", REPLACE(STR(?speaker__id), "^.*\\\\/(.+)", "$1")) AS ?speaker__dataProviderUrl)
  }
  UNION
  {
    ?id semparls:party ?party__id .
    ?party__id skos:prefLabel ?party__prefLabel .
    FILTER(LANG(?party__prefLabel) = "<LANG>")
  }
  UNION 
  {
    ?id semparls:speechType ?speechType__id .
    # ?speechType__id skos:prefLabel ?speechType__prefLabel .
    BIND(?speechType__id as ?speechType__prefLabel)
  }
  UNION
  {
    ?id dct:language ?language
  }
`
