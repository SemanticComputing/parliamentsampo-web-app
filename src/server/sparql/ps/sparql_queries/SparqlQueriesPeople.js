const perspectiveID = 'people'

export const personPropertiesInstancePage =
` 
  ?id skos:prefLabel ?prefLabel__id . 
  BIND(?prefLabel__id as ?prefLabel__prefLabel)
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__dataProviderUrl)
  BIND(?id as ?uri__prefLabel)

  {
    ?id xl:altLabel/skos:prefLabel ?altLabel .
  }
  UNION
  {
    ?id semparls:extra_info ?extraInfo .
  }
  UNION
  {
    ?id semparls:authored ?authored .
  }
  UNION
  {
    ?id semparls:has_party_membership/semparls:party ?party__id .
    ?party__id skos:prefLabel ?party__prefLabel .
    FILTER(LANG(?party__prefLabel) = "<LANG>")
    BIND(CONCAT("/groups/page/", REPLACE(STR(?party__id), "^.*\\\\/(.+)", "$1")) AS ?party__dataProviderUrl)
  }
  UNION
  {
    ?id bioc:has_occupation ?occupation__id .
    ?occupation__id skos:prefLabel ?occupation__prefLabel .
    FILTER(LANG(?occupation__prefLabel) = "<LANG>")
    BIND(CONCAT("/occupations/page/", REPLACE(STR(?occupation__id), "^.*\\\\/(.+)", "$1")) AS ?occupation__dataProviderUrl)
  }
  UNION
  {
    ?id semparls:has_education ?education__id .
    ?education__id skos:prefLabel ?education__prefLabel .
    FILTER(LANG(?education__prefLabel) = "<LANG>")
    BIND(CONCAT("/occupations/page/", REPLACE(STR(?education__id), "^.*\\\\/(.+)", "$1")) AS ?education__dataProviderUrl)
  }
  UNION
  {
    ?id bioc:has_gender ?gender__id .
    ?gender__id skos:prefLabel ?gender__prefLabel .
    FILTER(LANG(?gender__prefLabel) = "<LANG>")
  }
  UNION
  {
    ?id crm:P98i_was_born/crm:P7_took_place_at ?placeOfBirth__id .
    ?placeOfBirth__id skos:prefLabel ?placeOfBirth__prefLabel .
    FILTER(LANG(?placeOfBirth__prefLabel) = "<LANG>")
    BIND(CONCAT("/places/page/", REPLACE(STR(?placeOfBirth__id), "^.*\\\\/(.+)", "$1")) 
      AS ?placeOfBirth__dataProviderUrl)
  }
  UNION
  {
    ?id crm:P98i_was_born/crm:P4_has_time-span/crm:P81a_begin_of_the_begin ?date_ .
    BIND(YEAR(?date_) as ?dateOfBirthTimespan)
  }
  UNION
  {
    ?id crm:P74_has_current_or_former_residence ?home_location
  }
  UNION
  {
    ?id crm:P100i_died_in/crm:P7_took_place_at ?placeOfDeath__id .
    ?placeOfDeath__id skos:prefLabel ?placeOfDeath__prefLabel .
    FILTER(LANG(?placeOfDeath__prefLabel) = "<LANG>")
    BIND(CONCAT("/places/page/", REPLACE(STR(?placeOfDeath__id), "^.*\\\\/(.+)", "$1")) 
      AS ?placeOfDeath__dataProviderUrl)
  }
  UNION
  {
    ?id crm:P100i_died_in/crm:P4_has_time-span/crm:P81a_begin_of_the_begin ?ddate_ .
    BIND(YEAR(?ddate_) as ?dateOfDeathTimespan)
  }
  UNION
  {
    ?id bioc:bearer_of/crm:P11i_participated_in [
        a semparls:ElectoralDistrictCandidature ;
        semparls:organization ?district__id ] .
    ?district__id skos:prefLabel ?district__prefLabel .
    FILTER(LANG(?district__prefLabel) = "<LANG>")
    BIND(CONCAT("/districts/page/", REPLACE(STR(?district__id), "^.*\\\\/(.+)", "$1")) AS ?district__dataProviderUrl)
  }
  UNION
  {
    ?id bioc:bearer_of/crm:P11i_participated_in [ 
        a semparls:ParliamentaryGroupMembership  ;
        semparls:organization ?parliamentaryGroup__id ] .
    ?parliamentaryGroup__id skos:prefLabel ?parliamentaryGroup__prefLabel .
    FILTER(LANG(?parliamentaryGroup__prefLabel) = "<LANG>")
    BIND(CONCAT("/groups/page/", REPLACE(STR(?parliamentaryGroup__id), "^.*\\\\/(.+)", "$1")) AS ?parliamentaryGroup__dataProviderUrl)
  }
  UNION
  {
    ?id bioc:bearer_of/crm:P11i_participated_in ?evt .
    ?evt a semparls:ParliamentMembership .
    {
        ?evt crm:P10_falls_within ?electoralTerm__id .
        ?electoralTerm__id skos:prefLabel ?electoralTerm__prefLabel .
        FILTER(LANG(?electoralTerm__prefLabel) = "<LANG>")
        BIND(CONCAT("/terms/page/", REPLACE(STR(?electoralTerm__id), "^.*\\\\/(.+)", "$1")) AS ?electoralTerm__dataProviderUrl)
    } UNION {
        ?evt crm:P4_has_time-span ?parliamentPeriod__id .
        ?parliamentPeriod__id skos:prefLabel ?parliamentPeriod__prefLabel .
    }
  }
  UNION 
  {
    SELECT DISTINCT ?id ?parliament__id ?parliament__prefLabel ?parliament__dataProviderUrl
    WHERE {
        VALUES ?eclass { semparls:GovernmentMembership semparls:ParliamentMembership }
        ?id bioc:bearer_of/crm:P11i_participated_in [ a ?eclass ;
          semparls:organization ?parliament__id ] .
        
        ?parliament__id skos:prefLabel ?parliament__prefLabel .
        FILTER(LANG(?parliament__prefLabel) = "<LANG>")
        BIND(CONCAT("/groups/page/", REPLACE(STR(?parliament__id), "^.*\\\\/(.+)", "$1")) AS ?parliament__dataProviderUrl)
        OPTIONAL { ?parliament__id (crm:P4_has_time-span|crm:P10_falls_within)/crm:P81a_begin_of_the_begin ?evt_start }
    } ORDER BY COALESCE(str(?evt_start),'9999')
  }
  UnION
  {
    ?id sch:sameAs ?exlink__id .
    ?exlink__id a/skos:prefLabel ?exlink__prefLabel .
    BIND(?exlink__id AS ?exlink__dataProviderUrl)
  }
  UNION 
  {
    ?id dct:source ?datasource__id .
    ?datasource__id a/skos:prefLabel ?datasource__prefLabel .
    BIND(?datasource__id as ?datasource__dataProviderUrl)
  }
  UNION
  {
    ?id bioc:has_family_relation [ skos:prefLabel ?relative__prefLabel ; bioc:inheres_in ?relative__id ] .
    FILTER (LANG(?relative__prefLabel)='<LANG>')
    BIND(CONCAT("/people/page/", REPLACE(STR(?relative__id), "^.*\\\\/(.+)", "$1")) AS ?relative__dataProviderUrl)
  }
  UNION
  {
    ?id semparls:has_affiliation [ skos:prefLabel ?_afft ; semparls:affiliation_group/skos:prefLabel ?_afft2 ]
    BIND(CONCAT(?_afft, ' (', ?_afft2, ')') AS ?affiliation)
  }
  UNION 
  {
    ?id sch:image ?image__id ;
      skos:prefLabel ?image__description ;
      skos:prefLabel ?image__title .
      BIND(URI(CONCAT(REPLACE(STR(?image__id), "https*:", ""), "?width=600")) as ?image__url)
  }
  UNION
  { 
    SELECT DISTINCT ?id ?representativePeriodTimespan 
    WHERE {
      ?id semparls:representative_period [ 
          crm:P81a_begin_of_the_begin ?_start ;
          skos:prefLabel ?representativePeriodTimespan 
      ] }
    ORDER BY ?_start 
  }
  UNION
  {
    SELECT DISTINCT ?id ?group__id ?group__prefLabel ?group__dataProviderUrl WHERE {
      VALUES ?evtclass {  semparls:Career semparls:Affiliation semparls:MunicipalPositionOfTrust semparls:PositionOfTrust semparls:GovernmentalPositionOfTrust }
      ?id bioc:bearer_of/crm:P11i_participated_in [ a ?evtclass ;
                                                    semparls:organization ?group__id ] .
      ?group__id skos:prefLabel ?group__prefLabel .
      FILTER(LANG(?group__prefLabel) = "<LANG>")
      BIND(CONCAT("/groups/page/", REPLACE(STR(?group__id), "^.*\\\\/(.+)", "$1")) AS ?group__dataProviderUrl)
    }
  }
`

export const personPropertiesFacetResults =
` ?id skos:prefLabel ?prefLabel__id . 
  BIND (?prefLabel__id as ?prefLabel__prefLabel)
  BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__dataProviderUrl)
  BIND(?id as ?uri__prefLabel)

  {
    ?id semparls:has_party_membership/semparls:party ?party__id .
    ?party__id skos:prefLabel ?party__prefLabel .
    FILTER(LANG(?party__prefLabel) = "<LANG>")
    BIND(CONCAT("/groups/page/", REPLACE(STR(?party__id), "^.*\\\\/(.+)", "$1")) AS ?party__dataProviderUrl)
  }
  UNION
  {
    ?id sch:image ?image__id ;
      skos:prefLabel ?image__description ;
      skos:prefLabel ?image__title .
      BIND(URI(CONCAT(REPLACE(STR(?image__id), "https*:", ""), "?width=600")) as ?image__url)
  }
  UNION
  {
    ?id bioc:has_occupation ?occupation__id .
    ?occupation__id skos:prefLabel ?occupation__prefLabel .
    FILTER(LANG(?occupation__prefLabel) = "<LANG>")
  }
  UNION
  {
    ?id bioc:has_gender ?gender__id .
    ?gender__id skos:prefLabel ?gender__prefLabel .
    FILTER(LANG(?gender__prefLabel) = "<LANG>")
  }
  UNION
  {
    ?id crm:P98i_was_born/crm:P7_took_place_at ?placeOfBirth__id .
    ?placeOfBirth__id skos:prefLabel ?placeOfBirth__prefLabel .
    FILTER(LANG(?placeOfBirth__prefLabel) = "<LANG>")
    BIND(CONCAT("/places/page/", REPLACE(STR(?placeOfBirth__id), "^.*\\\\/(.+)", "$1")) 
      AS ?placeOfBirth__dataProviderUrl)
  }
  UNION
  {
    ?id crm:P98i_was_born/crm:P4_has_time-span/crm:P81a_begin_of_the_begin ?date_ .
    BIND(YEAR(?date_) as ?dateOfBirthTimespan)
  }
  UNION
  {
    ?id crm:P74_has_current_or_former_residence ?home_location
  }
  UNION
  {
    ?id crm:P100i_died_in/crm:P7_took_place_at ?placeOfDeath__id .
    ?placeOfDeath__id skos:prefLabel ?placeOfDeath__prefLabel .
    FILTER(LANG(?placeOfDeath__prefLabel) = "<LANG>")
    BIND(CONCAT("/places/page/", REPLACE(STR(?placeOfDeath__id), "^.*\\\\/(.+)", "$1")) 
      AS ?placeOfDeath__dataProviderUrl)
  }
  UNION
  {
    ?id crm:P100i_died_in/crm:P4_has_time-span/crm:P81a_begin_of_the_begin ?ddate_ .
    BIND(YEAR(?ddate_) as ?dateOfDeathTimespan)
  }
  UNION
  {
    ?id semparls:representative_period/skos:prefLabel ?representativePeriodTimespan .
  }
  UNION
  {
    ?id bioc:bearer_of/crm:P11i_participated_in [ 
          a semparls:ParliamentaryGroupMembership ; 
          crm:P10_falls_within ?electoralTerm__id ] .
        ?electoralTerm__id skos:prefLabel ?electoralTerm__prefLabel .
        FILTER(LANG(?electoralTerm__prefLabel) = "<LANG>")
        BIND(CONCAT("/terms/page/", REPLACE(STR(?electoralTerm__id), "^.*\\\\/(.+)", "$1")) AS ?electoralTerm__dataProviderUrl)
  }
  UNION
  {
    ?id dct:source/a ?datasource__id .
    ?datasource__id skos:prefLabel ?datasource__prefLabel .
    FILTER(LANG(?datasource__prefLabel) = "<LANG>")
    BIND(?datasource__id as ?datasource__dataProviderUrl)
  }
`

export const personSpeechesQuery =
` SELECT DISTINCT ?id ?uri__id ?uri__prefLabel ?uri__dataProviderUrl 
?prefLabel__id ?prefLabel__prefLabel
?event__id ?event__prefLabel ?event__dataProviderUrl ?event__date 
WHERE {
  BIND(<ID> as ?id)
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__prefLabel)
  BIND(?id as ?uri__dataProviderUrl)

  ?id skos:prefLabel ?prefLabel__id .
  BIND (?prefLabel__id as ?prefLabel__prefLabel)

  ?event__id semparls:speaker ?id ;
             skos:prefLabel ?event__label ;
             semparls:content ?content .
  OPTIONAL { ?event__id dct:date ?_date }
  OPTIONAL { ?event__id semparls:speechOrder ?_ord }

  BIND (CONCAT(REPLACE(?event__label, ' [(][^)]+[)]$', ''), ": (", SUBSTR(?content,1,50), "...)") AS ?event__prefLabel)
  BIND(CONCAT("/speeches/page/", REPLACE(STR(?event__id), "^.*\\\\/(.+)", "$1")) AS ?event__dataProviderUrl)
  BIND(COALESCE(?_date, '(aika ei tiedossa)') AS ?event__date)
  
} ORDER BY COALESCE(?_date, "2999-01-01"^^xsd:date) ?_ord
`

/**
 * TODO:
 * statistics, e.g.:
 * https://api.triplydb.com/s/JKZPf3Gnx
 * https://api.triplydb.com/s/Ms1mzdywj
*/

//  https://api.triplydb.com/s/1OUQE49vA
export const personEventsQuery =
` SELECT DISTINCT ?id ?prefLabel__id ?prefLabel__prefLabel ?uri__id ?uri__prefLabel ?uri__dataProviderUrl ?event__id ?event__prefLabel ?event__dataProviderUrl ?event__date 
WHERE {
  BIND(<ID> as ?id)
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__prefLabel)
  BIND(?id as ?uri__dataProviderUrl)

  ?id skos:prefLabel ?prefLabel__id .
  BIND (?prefLabel__id as ?prefLabel__prefLabel)

  { 
    ?id bioc:bearer_of ?role__id .
      ?role__id crm:P11i_participated_in ?event__id ;
              skos:prefLabel ?role__prefLabel .
      FILTER(LANG(?role__prefLabel)="fi")
     ?event__id skos:prefLabel ?evt__prefLabel . FILTER(LANG(?evt__prefLabel)="fi")
    BIND(CONCAT("/events/page/", REPLACE(STR(?event__id), "^.*\\\\/(.+)", "$1")) AS ?event__dataProviderUrl)
  } 
  UNION
  {
    ?id semparls:has_career|semparls:has_education|semparls:has_honour ?event__id .
    ?event__id skos:prefLabel ?evt__prefLabel . FILTER(LANG(?evt__prefLabel)="fi")
    BIND(CONCAT("/events/page/", REPLACE(STR(?event__id), "^.*\\\\/(.+)", "$1")) AS ?event__dataProviderUrl)
  BIND('' AS ?role__prefLabel)
  }
  UNION
  {
    ?id semparls:authored ?event__id .
    ?event__id skos:prefLabel ?evt__prefLabel .
    BIND('Henkilön julkaisu' AS ?role__prefLabel)
    BIND(CONCAT("/publications/page/", REPLACE(STR(?event__id), "^.*\\\\/(.+)", "$1")) AS ?event__dataProviderUrl)
  }
  UNION
  {
    ?id crm:P129i_is_subject_of ?event__id .
    OPTIONAL { ?event__id skos:prefLabel ?evt__prefLabel }
      BIND('Henkilöä käsittelevä julkaisu' AS ?role__prefLabel)
    BIND(CONCAT("/publications/page/", REPLACE(STR(?event__id), "^.*\\\\/(.+)", "$1")) AS ?event__dataProviderUrl)
  }

  OPTIONAL {  ?event__id  crm:P4_has_time-span ?time__id .
      OPTIONAL { ?time__id skos:prefLabel ?time__prefLabel }
      OPTIONAL { ?time__id crm:P81a_begin_of_the_begin ?time__start }
      OPTIONAL { ?time__id crm:P82b_end_of_the_end ?time__end }
  }

  BIND(IF(REGEX(STR(?evt__prefLabel), STR(?role__prefLabel)), 
      STR(?evt__prefLabel),
      CONCAT(?role__prefLabel, ': ', ?evt__prefLabel))
      AS ?event__prefLabel)
    BIND(COALESCE(?time__prefLabel, '(aika ei tiedossa)') AS ?event__date) 
  }
  ORDER BY COALESCE(?time__start, ?time__end, "2999-01-01"^^xsd:date) ?time__end 
`

// https://api.triplydb.com/s/EO7-OzuhM
export const networkLinkQuery = `
SELECT DISTINCT ?source ?target ('' AS ?prefLabel) ?weight
WHERE {
  VALUES ?id { <ID> }
  ?node a semparls:Distance ;
    semparls:relates_to ?id ;
      semparls:relates_to ?target ;
      semparls:value ?weight .
  FILTER (?id!=?target)
  OPTIONAL { 
    ?node semparls:link_by [ skos:prefLabel ?link ; a ?link_class ]
    FILTER(LANG(?link)='fi')
  }
  
  BIND(?id as ?source)
} 
`

//  https://api.triplydb.com/s/Akju-2eeb
export const networkNodeQuery = `
SELECT DISTINCT ?id ?prefLabel (SAMPLE(?_color) AS ?color) ?href
WHERE {
    VALUES ?id { <ID_SET> }
    ?id xl:prefLabel/skos:prefLabel ?prefLabel .
    OPTIONAL { ?id semparls:has_party_membership/semparls:party/semparls:hexcolor ?_color }
    BIND(CONCAT("../", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1"),"/network") AS ?href)
} GROUP BY ?id ?prefLabel ?href
`

export const ageQuery = `
SELECT ?category (count(?time1) AS ?age_at_start) (count(?time2) AS ?age_at_end)
WHERE {
  <FILTER>
  ?person__id a bioc:Person ;
    crm:P98i_was_born/crm:P4_has_time-span ?bspan ;
    bioc:bearer_of/crm:P11i_participated_in [
      a semparls:ParliamentMembership ;
      crm:P4_has_time-span ?membspan ] .
  
  {
    ?bspan crm:P81a_begin_of_the_begin ?byear .
    ?membspan crm:P81a_begin_of_the_begin ?time1 .
    BIND (STR(year(?time1)-year(?byear)) AS ?category)
  } 
  UNION {
    ?bspan crm:P81a_begin_of_the_begin ?byear .
    ?membspan crm:P82b_end_of_the_end ?time2 .
    BIND (STR(year(?time2)-year(?byear)) AS ?category)
  }
  
} GROUPBY ?category ORDER BY ?category
`
