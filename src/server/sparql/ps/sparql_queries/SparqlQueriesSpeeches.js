const perspectiveID = 'speeches'

export const speechPropertiesInstancePage = ` 
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
  }
  UNION
  {
    ?id dct:language ?language__id .
    ?language__id skos:prefLabel ?language__prefLabel .
    FILTER(LANG(?language__prefLabel) = "<LANG>")
    # BIND(REPLACE(STR(?language_), "http://id.loc.gov/vocabulary/iso639-2/", "") as ?language)
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
    ?id semparl_linguistics:referenceToPlace/semparl_linguistics:link ?referencedPlace__id .
    ?referencedPlace__id skos:prefLabel ?referencedPlace__prefLabel .
    BIND(CONCAT("/places/page/", REPLACE(STR(?referencedPlace__id), "^.*\\\\/(.+)", "$1")) AS ?referencedPlace__dataProviderUrl)
  }
  UNION
  {
    ?id semparl_linguistics:referenceToPerson/semparl_linguistics:link ?referencedPerson__id .
    ?referencedPerson__id skos:prefLabel ?referencedPerson__prefLabel .
    BIND(CONCAT("/people/page/", REPLACE(STR(?referencedPerson__id), "^.*\\\\/(.+)", "$1")) AS ?referencedPerson__dataProviderUrl)
  }
  UNION
  {
    ?id semparl_linguistics:referencedNamedEntity/skos:prefLabel ?namedEntity .
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
    ?id semparls:item ?item__id .
    ?item__id semparls:relatedDocument ?document__id .
    ?document__id skos:prefLabel ?document__prefLabel .
    BIND(CONCAT("/documents/page/", REPLACE(STR(?document__id), "^.*\\\\/(.+)", "$1")) AS ?document__dataProviderUrl)
  }
  UNION
  {
    ?id semparls:plenarySession ?plenarySession__id .
    ?plenarySession__id skos:prefLabel ?plenarySession__prefLabel .
    BIND(CONCAT("/plenarySessions/page/", REPLACE(STR(?plenarySession__id), "^.*\\\\/(.+)", "$1")) AS ?plenarySession__dataProviderUrl)
  }
  UNION
  {
    ?id semparls:diary ?diary__id .
    BIND(?diary__id AS ?diary__dataProviderUrl)
    BIND(?diary__id AS ?diary__prefLabel)
  }
  UNION
  {
    ?id semparls:isInterruptedBy ?isInterruptedBy__id .
    ?isInterruptedBy__id semparls:content ?isInterruptedBy__label .
    OPTIONAL { ?isInterruptedBy__id semparls:interrupter ?isInterruptedBy__interrupter }
    BIND(CONCAT('"', STR(?isInterruptedBy__label), '" [', IF(bound(?isInterruptedBy__interrupter), STR(?isInterruptedBy__interrupter), ' - '), ']') AS ?isInterruptedBy__prefLabel)
    BIND(CONCAT("/interruptions/page/", REPLACE(STR(?isInterruptedBy__id), "^.*\\\\/(.+)", "$1")) AS ?isInterruptedBy__dataProviderUrl) .
  }
  UNION
  {
    ?id semparls:startTime ?startTime .
  }
  UNION
  {
    ?id semparls:endTime ?endTime .
  }
  UNION
  {
    ?id semparls:page ?page .
  }
  UNION
  {
    ?id semparls:version ?version .
  }
  UNION
  {
    ?id semparls:status ?status__id .
    ?status__id skos:prefLabel ?status__prefLabel .
  }
`

export const speechPropertiesFacetResults = ` 
  ?id skos:prefLabel ?prefLabel__id . 
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
  # {
  #  ?id semparl_linguistics:referenceToPlaceName/skos:prefLabel ?referencedPlace .
  # }
  # UNION
  {
    ?id semparls:item ?item__id .
    ?item__id skos:prefLabel ?item__prefLabel .
    BIND(CONCAT("/items/page/", REPLACE(STR(?item__id), "^.*\\\\/(.+)", "$1")) AS ?item__dataProviderUrl) .
  }
  UNION
  {
    ?id semparls:content ?content .
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
    BIND(CONCAT("/plenarySessions/page/", REPLACE(STR(?plenarySession__id), "^.*\\\\/(.+)", "$1")) AS ?plenarySession__dataProviderUrl)
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
  UNION
  {
    ?id semparls:relatedDocument ?document__id .
    ?document__id skos:prefLabel ?document__prefLabel .
    BIND(CONCAT("/documents/page/", REPLACE(STR(?document__id), "^.*\\\\/(.+)", "$1")) AS ?document__dataProviderUrl)
  }
`

export const plenarySessionPropertiesInstancePage = `
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__dataProviderUrl)
  BIND(?id as ?uri__prefLabel)
  {
    ?id skos:prefLabel ?prefLabel__id .
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
  }
  UNION
  {
    ?id dct:date ?date_ .
    OPTIONAL { ?id semparls:endDate ?endDate_ }
    BIND(IF(bound(?endDate_) && ?date_ != ?endDate_, CONCAT(" (Päättyi ",
                    STR(DAY(?endDate_)), 
                    ".", 
                    STR(MONTH(?endDate_)), 
                    ".", 
                    STR(YEAR(?endDate_)),
                    ")"),
                    " ") as ?endDate)
    BIND(CONCAT(STR(DAY(?date_)), 
                    ".", 
                    STR(MONTH(?date_)), 
                    ".", 
                    STR(YEAR(?date_)),
                    STR(?endDate)) as ?date)
  }
  UNION
  {
    ?id semparls:parliamentarySession ?parliamentarySession__id .
    ?parliamentarySession__id skos:prefLabel ?parliamentarySession__prefLabel .
    BIND(CONCAT("/parliamentarySessions/page/", REPLACE(STR(?parliamentarySession__id), "^.*\\\\/(.+)", "$1")) AS ?parliamentarySession__dataProviderUrl)
  }
  UNION
  {
    ?id semparls:transcript ?transcript__id .
    ?transcript__id skos:prefLabel ?transcript__prefLabel .
    ?transcript__id semparls:url ?url__id .
    BIND(?url__id as ?url__prefLabel)
    BIND(?url__id as ?url__dataProviderUrl)
    OPTIONAL { ?transcript__id semparls:version ?version }
    OPTIONAL { ?transcript__id semparls:status ?status__id .
              ?status__id skos:prefLabel ?status__prefLabel }
  }
  UNION
  {
    ?speech__id semparls:plenarySession ?id .
    ?speech__id a <http://ldf.fi/schema/semparl/Speech> .
    ?speech__id skos:prefLabel ?speech__prefLabel .
    BIND(CONCAT("/speeches/page/", REPLACE(STR(?speech__id), "^.*\\\\/(.+)", "$1")) AS ?speech__dataProviderUrl) .
  }
  UNION
  {
    ?item__id semparls:plenarySession ?id .
    ?item__id a <http://ldf.fi/schema/semparl/Item> .
    ?item__id skos:prefLabel ?item__prefLabel .
    BIND(CONCAT("/items/page/", REPLACE(STR(?item__id), "^.*\\\\/(.+)", "$1")) AS ?item__dataProviderUrl) .
  }
  UNION
  {
    ?id semparls:startTime ?startTime_ .
    BIND(CONCAT(STR(HOURS(?startTime_)), 
                     ":", 
                     STR(MINUTES(?startTime_))) as ?startTime)
  }
  UNION
  {
    ?id semparls:endTime ?endTime_ .
    BIND(CONCAT(STR(HOURS(?endTime_)), 
                      ":", 
                      STR(MINUTES(?endTime_))) as ?endTime)

  }
`
export const parliamentarySessionPropertiesInstancePage = `
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__dataProviderUrl)
  BIND(?id as ?uri__prefLabel)
  {
    ?id skos:prefLabel ?prefLabel__id .
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
  }
  UNION
  {
    ?id semparls:startDate ?startDate_ .
    BIND(CONCAT(STR(DAY(?startDate_)), 
                     ".", 
                     STR(MONTH(?startDate_)), 
                     ".", 
                    STR(YEAR(?startDate_))) as ?startDate)
  }
  UNION
  {
    ?id semparls:endDate ?endDate_ .
    BIND(CONCAT(STR(DAY(?endDate_)), 
                     ".", 
                     STR(MONTH(?endDate_)), 
                     ".", 
                    STR(YEAR(?endDate_))) as ?endDate)
  }
  UNION 
  {
    ?id semparls:electoralTerm ?electoralTerm__id .
    ?electoralTerm__id skos:prefLabel ?electoralTerm__prefLabel .
    BIND(CONCAT("/terms/page/", REPLACE(STR(?electoralTerm__id), "^.*\\\\/(.+)", "$1")) AS ?electoralTerm__dataProviderUrl)
  }
  UNION
  {
    ?plenarySession__id semparls:parliamentarySession ?id ;
                        skos:prefLabel ?plenarySession__prefLabel ;
                        semparls:orderNumber ?plenarySession__orderNumber .
    BIND(CONCAT("/plenarySessions/page/", REPLACE(STR(?plenarySession__id), "^.*\\\\/(.+)", "$1")) AS ?plenarySession__dataProviderUrl) .
  }
`

export const documentPropertiesInstancePage = `
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__dataProviderUrl)
  BIND(?id as ?uri__prefLabel)
  {
    ?id skos:prefLabel ?prefLabel__id .
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
  }
  UNION
  {
    ?id skos:altLabel ?altLabel .
  }
  UNION
  {
    ?id semparls:id ?doc_id .
  }
  UNION
  {
    ?item__id semparls:relatedDocument ?id .
    ?item__id skos:prefLabel ?item__label .
    ?item__id semparls:plenarySession ?pl__id .
    ?pl__id skos:prefLabel ?pl__prefLabel .
    BIND(CONCAT(STR(?item__label), " [", STR(?pl__prefLabel), "]") AS ?item__prefLabel)
    BIND(CONCAT("/items/page/", REPLACE(STR(?item__id), "^.*\\\\/(.+)", "$1")) AS ?item__dataProviderUrl)
  }
  UNION
  {
    ?id semparls:url ?url__id .
    BIND(?url__id as ?url__prefLabel) .
    BIND(?url__id as ?url__dataProviderUrl)
  }
  UNION
  {
    ?id semparls:title ?title .
  }
  UNION
  {
    ?id semparls:decision ?decision .
  }
  UNION
  {
    ?id semparls:dateDecided ?dateDecided_ .
    BIND(CONCAT(STR(DAY(?dateDecided_)), 
                     ".", 
                     STR(MONTH(?dateDecided_)), 
                     ".", 
                    STR(YEAR(?dateDecided_))) as ?dateDecided)
  }
  UNION
  {
    ?id dct:subject ?subject .
  }
`

export const interruptionPropertiesInstancePage = `
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__dataProviderUrl)
  BIND(?id as ?uri__prefLabel)
  {
    ?id skos:prefLabel ?prefLabel__id .
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
  }
  UNION
  {
    ?id semparls:speaker ?speaker__id .
    ?speaker__id skos:prefLabel ?speaker__prefLabel .
    BIND(CONCAT("/people/page/", REPLACE(STR(?speaker__id), "^.*\\\\/(.+)", "$1")) AS ?speaker__dataProviderUrl)
  }
  UNION
  {
    ?id semparls:interrupter ?interrupter .
  }
  UNION
  {
    ?id semparls:content ?content .
  }
`

export const speechesByYearQuery = `
  SELECT DISTINCT ?category (COUNT(DISTINCT ?speech) AS ?count)
  WHERE {
    <FILTER>
    ?speech a <FACET_CLASS> ;
              semparls:yearOfSpeech ?category .
  } 
  GROUP BY ?category
  ORDER BY ?category
`

export const speechesByYearAndPartyQuery = `
  SELECT ?id ?dataItem__id ?dataItem__prefLabel (count(?speech) as ?dataItem__value) WHERE {
    ?speech semparls:party ?dataItem__id ;
            semparls:speechType ?speechType ;
            dct:date ?date .
    ?dataItem__id skos:prefLabel ?dataItem__prefLabel .
    BIND(YEAR(?date) as ?id)
    FILTER(?speechType NOT IN (<http://ldf.fi/semparl/speechtypes/PuhemiesPuheenvuoro>))
    FILTER(LANG(?dataItem__prefLabel) = "<LANG>")
  }
  GROUP BY ?id ?dataItem__id ?dataItem__prefLabel
  ORDER BY ?id
`
