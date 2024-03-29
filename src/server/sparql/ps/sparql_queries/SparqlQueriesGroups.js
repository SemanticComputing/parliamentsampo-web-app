export const groupPropertiesInstancePage =
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
    ?id crm:P4_has_time-span/skos:prefLabel ?timespan
  }
  UNION
  {
    ?id crm:P10_falls_within ?electoralTerm__id .
    ?electoralTerm__id skos:prefLabel ?electoralTerm__prefLabel .
    FILTER(LANG(?electoralTerm__prefLabel)='<LANG>')
    BIND(CONCAT("/terms/page/", REPLACE(STR(?electoralTerm__id), "^.*\\\\/(.+)", "$1")) AS ?electoralTerm__dataProviderUrl)
  }
  UNION
  {
    ?id crm:P74_has_current_or_former_residence ?place__id .
    FILTER NOT EXISTS { ?place__id semparls:has_duplicate_child true }
    ?place__id skos:prefLabel ?place__prefLabel .
    FILTER(LANG(?place__prefLabel) = "<LANG>")
    BIND(CONCAT("/places/page/", REPLACE(STR(?place__id), "^.*\\\\/(.+)", "$1")) 
      AS ?place__dataProviderUrl)
  }
  UNION
  { 
    SELECT DISTINCT ?id ?person__id ?person__prefLabel 
    (CONCAT("/people/page/", REPLACE(STR(?person__id), "^.*\\\\/(.+)", "$1")) AS ?person__dataProviderUrl)
    WHeRE
    {
    ?id ^semparls:school ?role__id .
    ?role__id ^semparls:has_education ?person__id ; skos:prefLabel ?role__label . 
    FILTER(LANG(?role__label)="<LANG>")
    ?person__id  xl:prefLabel/skos:prefLabel ?_label .
    OPTIONAL { ?role__id semparls:year ?_date }
    BIND(
      CONCAT(?_label, 
          ' (', 
          ?role__label, 
          IF(BOUND(?_date), CONCAT(': ',?_date), ''), 
          ')' )
      AS ?person__prefLabel)
    }
  }
  UNION
  { SELECT DISTINCT ?id ?person__id ?person__prefLabel ?person__dataProviderUrl 
    WHERE {
      ?id ^semparls:organization ?evt .
      ?evt ^crm:P11i_participated_in ?role__id .
      ?person__id bioc:bearer_of ?role__id ;
                  xl:prefLabel/skos:prefLabel ?_label .
      OPTIONAL { ?evt crm:P4_has_time-span [ skos:prefLabel ?_date ; crm:P81a_begin_of_the_begin ?_start ] }
      ?role__id skos:prefLabel ?role__label . FILTER(LANG(?role__label)='<LANG>')
      
      BIND(
        CONCAT(
          ?_label, ' (', ?role__label,
          IF(BOUND(?_date), CONCAT(': ',?_date), ''),
          ')' ) 
        AS ?person__prefLabel
      )
      BIND(CONCAT("/people/page/", REPLACE(STR(?person__id), "^.*\\\\/(.+)", "$1")) AS ?person__dataProviderUrl)
    } ORDER BY ?_start ?_label
  }
  UNION
  {
    SELECT DISTINCT ?id ?person__id ?person__prefLabel ?person__dataProviderUrl 
    WHERE {
      ?id ^semparls:party ?evt .
      ?person__id semparls:has_party_membership ?evt ; skos:prefLabel ?person__prefLabel .
      BIND(CONCAT("/people/page/", REPLACE(STR(?person__id), "^.*\\\\/(.+)", "$1")) AS ?person__dataProviderUrl)
    } ORDER BY ?person__prefLabel 
  }
  UNION
  {
    SELECT DISTINCT ?id ?person__id ?person__prefLabel ?person__dataProviderUrl 
    WHERE {
      ?id ^(semparls:has_affiliation/semparls:organization) ?person__id .
      ?person__id skos:prefLabel ?person__prefLabel .
      BIND(CONCAT("/people/page/", REPLACE(STR(?person__id), "^.*\\\\/(.+)", "$1")) AS ?person__dataProviderUrl)
    } ORDER BY ?person__prefLabel 
  }
  UNION
  {
    SELECT DISTINCT ?id ?related__id 
    (CONCAT(STR(?_label), " (", STR(COUNT(DISTINCT ?prs)), ")") AS ?related__prefLabel)
    (CONCAT("/groups/page/", REPLACE(STR(?related__id), "^.*\\\\/(.+)", "$1")) AS ?related__dataProviderUrl)
    WHERE {
      {
        ?id ^(bioc:bearer_of/crm:P11i_participated_in/semparls:organization) ?prs ; a ?idtype .
        ?prs bioc:bearer_of/crm:P11i_participated_in/semparls:organization ?related__id .
      }
      UNION
      {
        ?id ^(semparls:has_party_membership/semparls:party) ?prs ; a ?idtype .
        ?prs semparls:has_party_membership/semparls:party ?related__id .
      }
      ?related__id skos:prefLabel ?_label ; a ?reltype .
      FILTER(?related__id!=?id && ?reltype=?idtype && LANG(?_label)='<LANG>')
      # BIND(CONCAT("/groups/page/", REPLACE(STR(?related__id), "^.*\\\\/(.+)", "$1")) AS ?related__dataProviderUrl)
    } 
    GROUP BY ?id ?related__id ?_label 
    ORDER BY DESC(COUNT(DISTINCT ?prs))
}
  UNION
  {
    {
      ?id a/semparls:party ?related__id
    } UNION
    {
      ?id crm:P74_has_current_or_former_residence/^crm:P74_has_current_or_former_residence ?related__id
    }
    ?related__id skos:prefLabel ?related__prefLabel .
    FILTER NOT EXISTS { ?related__id a bioc:Person }
    FILTER(LANG(?related__prefLabel)='<LANG>')
    BIND(CONCAT("/groups/page/", REPLACE(STR(?related__id), "^.*\\\\/(.+)", "$1")) AS ?related__dataProviderUrl)
  }
  UNION
  {
    ?id sch:sameAs ?exlink__id .
    ?exlink__id a/skos:prefLabel ?exlink__prefLabel .
    BIND(?exlink__id AS ?exlink__dataProviderUrl)
  }
  UNION
  {
    ?id sch:image ?image__id ;
      skos:prefLabel ?image__title ;
      skos:prefLabel ?image__description .

      BIND(URI(REPLACE(STR(?image__id), '/Special:FilePath/' ,'/File:')) AS ?image_page)
    
    OPTIONAL { ?image__id dct:license ?license
      OPTIONAL { ?image__id semparls:license_link ?license_href }
    }
    
    BIND(CONCAT('<a href="', STR(?image_page), '" target="_blank">Wikimedia Commons</a>',
      IF (BOUND(?license_href), 
        CONCAT(', käyttöoikeus: <a href="', STR(?license_href), '" target="_blank">', STR(?license),"</a>"),
        CONCAT(", käyttöoikeus: ", STR(?license))
      )
    ) AS ?imagecredit)
    
    BIND(URI(CONCAT(REPLACE(STR(?image__id), "https*:", ""), "?width=600")) as ?image__url)
  }
`
