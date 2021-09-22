export const publicationPropertiesInstancePage =
` 
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__dataProviderUrl)
  BIND(?id as ?uri__prefLabel)

  {
    ?id skos:prefLabel ?prefLabel__id .
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
    # FILTER(LANG(?prefLabel__prefLabel)='<LANG>')
  }
  UNION
  {
    ?id skos:altLabel ?altLabel .
  }
  UNION
  {
    ?id crm:P4_has_time-span/skos:prefLabel ?timespan 
  }
  UNION
  {
    ?author__id semparls:authored ?id ;
                skos:prefLabel ?author__prefLabel .
    BIND(CONCAT("/people/page/", REPLACE(STR(?author__id), "^.*\\\\/(.+)", "$1")) AS ?author__dataProviderUrl)

    OPTIONAL {
      ?author__id semparls:authored ?related__id .
      FILTER (?related__id!=?id)
      ?related__id skos:prefLabel ?related__prefLabel .
      BIND(CONCAT("/publications/page/", REPLACE(STR(?related__id), "^.*\\\\/(.+)", "$1")) AS ?related__dataProviderUrl)
    }
  }
  UNION
  {
    ?id semparls:author_text ?extraInfo .
  }
  UNION
  {
    ?subject__id crm:P129i_is_subject_of ?id ;
                skos:prefLabel ?subject__prefLabel .
    BIND(CONCAT("/people/page/", REPLACE(STR(?subject__id), "^.*\\\\/(.+)", "$1")) AS ?subject__dataProviderUrl)
  }
`
