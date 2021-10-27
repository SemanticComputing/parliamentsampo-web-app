const perspectiveID = 'speeches'

export const speechPropertiesInstancePage =
  ` 
  ?id skos:prefLabel ?prefLabel__id . 
  BIND(?prefLabel__id as ?prefLabel__prefLabel)
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
    BIND(CONCAT("/groups/page/", REPLACE(STR(?party__id), "^.*\\\\/(.+)", "$1")) AS ?party__dataProviderUrl)
  }
  UNION
  {
    ?id semparls:speechType ?speechType__id .
    ?speechType__id skos:prefLabel ?speechType__prefLabel .
    # BIND(?speechType__id as ?speechType__prefLabel)
 
  }
  UNION
  {
    ?id dct:language ?language_ .
    BIND(REPLACE(STR(?language_), "http://id.loc.gov/vocabulary/iso639-2/", "") as ?language)
  }
  UNION
  {
    ?id dct:date ?date_ .
    BIND(CONCAT(STR(DAY(?date_)), 
                     ".", 
                     STR(MONTH(?date_)), 
                     ".", 
                    STR(YEAR(?date_))) as ?date)
  }
  UNION 
  {
    ?id semparl_linguistics:referenceToPlaceName/semparl_linguistics:link ?referencedPlace__id .
    ?referencedPlace__id skos:prefLabel ?referencedPlace__prefLabel .
    FILTER(LANG(?referencedPlace__prefLabel) = "<LANG>")
  }
  UNION
  {
    ?id semparls:content ?content .
  }
  UNION
  {
    ?id semparls:item ?item__id .
    ?item__id skos:prefLabel ?item__prefLabel .
    BIND(CONCAT("/items/page/", REPLACE(STR(?item__id), "^.*\\\\/(.+)", "$1")) AS ?item__dataProviderUrl)
  }
  UNION
  {
    ?id semparls:roleGivenInSource ?roleGivenInSource .
  }
  UNION
  {
    ?id semparls:orderNumber ?orderNumber .
  }
  UNION
  {
    ?id semparls:parliamentaryRole ?parliamentaryRole__id .
    ?parliamentaryRole__id skos:prefLabel ?parliamentaryRole__prefLabel .
  }
  UNION
  {
    ?id semparls:groupOfSpeaker ?groupOfSpeaker__id .
    ?groupOfSpeaker__id skos:prefLabel ?groupOfSpeaker__prefLabel .
    FILTER(LANG(?groupOfSpeaker__prefLabel) = "<LANG>")
    BIND(CONCAT("/groups/page/", REPLACE(STR(?groupOfSpeaker__id), "^.*\\\\/(.+)", "$1")) AS ?groupOfSpeaker__dataProviderUrl)
  }
  UNION
  {
    ?id semparls:plenarySession ?plenarySession__id .
    ?plenarySession__id skos:prefLabel ?plenarySession__prefLabel .
  }
  UNION
  {
    ?id semparls:diary ?diary__id .
    BIND(?diary__id AS ?diary__dataProviderUrl)
    BIND(?diary__id AS ?diary__prefLabel)
  }
`

export const speechPropertiesFacetResults =
  ` ?id skos:prefLabel ?prefLabel__id . 
  BIND(?prefLabel__id as ?prefLabel__prefLabel)
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
    BIND(CONCAT("/groups/page/", REPLACE(STR(?party__id), "^.*\\\\/(.+)", "$1")) AS ?party__dataProviderUrl)
  }
  UNION 
  {
    ?id semparls:speechType ?speechType__id .
    ?speechType__id skos:prefLabel ?speechType__prefLabel .
    # BIND(REPLACE(STR(?speechType__id), "http://ldf.fi/semparl/", "") as ?speechType__prefLabel)
  }
  UNION
  {
    ?id dct:language ?language_ .
    BIND(REPLACE(STR(?language_), "http://id.loc.gov/vocabulary/iso639-2/", "") as ?language)
  }
  UNION
  {
    ?id dct:date ?date_ .
    BIND(CONCAT(STR(DAY(?date_)), 
                     ".", 
                     STR(MONTH(?date_)), 
                     ".", 
                    STR(YEAR(?date_))) as ?date)
  }
  UNION 
  {
    ?id semparl_linguistics:referenceToPlaceName/semparl_linguistics:link ?referencedPlace__id .
    ?referencedPlace__id skos:prefLabel ?referencedPlace__prefLabel .
    FILTER(LANG(?referencedPlace__prefLabel) = "<LANG>")
  }
  UNION
  {
    ?id semparls:item ?item__id .
    ?item__id skos:prefLabel ?item__prefLabel .
    BIND(CONCAT("/items/page/", REPLACE(STR(?item__id), "^.*\\\\/(.+)", "$1")) AS ?item__dataProviderUrl) .
  }
`

export const itemPropertiesInstancePage = `
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
    ?id semparls:plenarySession ?plenarySession__id .
    ?plenarySession__id skos:prefLabel ?plenarySession__prefLabel .
  }
  UNION
  {
    ?id semparls:governmentProposal ?governmentProposal__id .
    ?governmentProposal__id skos:prefLabel ?governmentProposal__prefLabel .
  }
  UNION
  {
    ?id semparls:diary ?diary__id .
    BIND(?diary__id as ?diary__prefLabel) .
    BIND(?diary__id as ?diary__dataProviderUrl)
  }
  UNION
  {
    ?speech__id semparls:item ?id .
    ?speech__id skos:prefLabel ?speech__prefLabel .
    BIND(CONCAT("/speeches/page/", REPLACE(STR(?speech__id), "^.*\\\\/(.+)", "$1")) AS ?speech__dataProviderUrl) .
  }
`
