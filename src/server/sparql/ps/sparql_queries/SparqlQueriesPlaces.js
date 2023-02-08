export const placePropertiesInstancePage =
` 
BIND(?id as ?uri__id)
BIND(?id as ?uri__dataProviderUrl)
BIND(?id as ?uri__prefLabel)

{
  ?id skos:prefLabel ?prefLabel__id .
  BIND(?prefLabel__id as ?prefLabel__prefLabel)
  FILTER(LANG(?prefLabel__prefLabel)="<LANG>")
}
UNION
{
  ?id skos:altLabel ?altLabel .
}
UNION
{
  ?id skos:broader+ ?broader__id .
  ?broader__id skos:prefLabel ?broader__prefLabel .
  FILTER(LANG(?broader__prefLabel)="<LANG>")
  BIND(CONCAT("/places/page/", REPLACE(STR(?broader__id), "^.*\\\\/(.+)", "$1")) AS ?broader__dataProviderUrl)
}
UNION
{
  ?narrower__id skos:broader ?id .
  ?narrower__id skos:prefLabel ?narrower__prefLabel .
  FILTER(LANG(?narrower__prefLabel)="<LANG>")
  BIND(CONCAT("/places/page/", REPLACE(STR(?narrower__id), "^.*\\\\/(.+)", "$1")) AS ?narrower__dataProviderUrl)
}
UNION
{
  ?id skos:broader/(^skos:broader) ?related__id .
  ?related__id skos:prefLabel ?related__prefLabel .
  FILTER(?related__id != ?id && LANG(?related__prefLabel)="<LANG>")
  BIND(CONCAT("/places/page/", REPLACE(STR(?related__id), "^.*\\\\/(.+)", "$1")) AS ?related__dataProviderUrl)
}
UNION
{
  ?group__id crm:P74_has_current_or_former_residence ?id ;
    skos:prefLabel ?group__prefLabel .
  FILTER NOT EXISTS { ?group__id a bioc:Person }
  FILTER(LANG(?group__prefLabel) = "<LANG>")
  BIND(CONCAT("/groups/page/", REPLACE(STR(?group__id), "^.*\\\\/(.+)", "$1")) AS ?group__dataProviderUrl)
}
UnIoN
{
  ?id sch:sameAs ?exlink__id .
  ?exlink__id a/skos:prefLabel ?exlink__prefLabel .
  BIND(?exlink__id AS ?exlink__dataProviderUrl)
}
UNION
{
  ?id ^crm:P7_took_place_at ?evt .
  {
    ?born__id crm:P98i_was_born ?evt ;
      skos:prefLabel ?born__prefLabel .
    BIND(CONCAT("/people/page/", REPLACE(STR(?born__id), "^.*\\\\/(.+)", "$1")) AS ?born__dataProviderUrl)
  }
  UNION
  {
    ?deceased__id crm:P100i_died_in ?evt ;
    skos:prefLabel ?deceased__prefLabel .
    BIND(CONCAT("/people/page/", REPLACE(STR(?deceased__id), "^.*\\\\/(.+)", "$1")) AS ?deceased__dataProviderUrl)
  }
  UNION
  {
    ?resident__id crm:P74_has_current_or_former_residence ?id ;
      skos:prefLabel ?resident__prefLabel ;
      a bioc:Person .
    BIND(CONCAT("/people/page/", REPLACE(STR(?resident__id), "^.*\\\\/(.+)", "$1")) AS ?resident__dataProviderUrl)
  }
  UNION
  {
    ?id sch:image ?image__id ;
      skos:prefLabel ?image__title ;
      skos:prefLabel ?image__description .

      BIND(URI(REPLACE(STR(?image__id), '/Special:FilePath/' ,'/File:')) AS ?image_page)
    ?image__id dct:license ?license
    OPTIONAL { ?image__id semparls:license_link ?license_href }
    
    BIND(CONCAT('<a href="', STR(?image_page), '" target="_blank">Wikimedia Commons</a>',
      IF (BOUND(?license_href), 
        CONCAT(', käyttöoikeus: <a href="', STR(?license_href), '" target="_blank">', STR(?license),"</a>"),
        CONCAT(", käyttöoikeus: ", STR(?license))
      )
    ) AS ?imagecredit)
    
    BIND(URI(CONCAT(REPLACE(STR(?image__id), "https*:", ""), "?width=600")) as ?image__url)
  }
}
`

export const placeMentionsTabInstancePage =
` 
SELECT * {
  BIND(<ID> as ?id)
    
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__dataProviderUrl)
  BIND(?id as ?uri__prefLabel)

  ?id skos:prefLabel ?prefLabel__id .
  BIND(?prefLabel__id as ?prefLabel__prefLabel)
  FILTER(LANG(?prefLabel__prefLabel)="fi")

  { SELECT DISTINCT ?id ?speech__id ?speech__prefLabel 
    (CONCAT("/speeches/page/", REPLACE(STR(?speech__id), "^.*\\\\/(.+)", "$1")) AS ?speech__dataProviderUrl)  
      WHERE {
  ?id ^(semparl_linguistics:referenceToPlace/skos:relatedMatch) ?speech__id .
  ?speech__id skos:prefLabel ?speech__prefLabel .
    } 
  }
  UNION
  { SELECT DISTINCT ?id ?speaker__id ?speaker__prefLabel 
      (CONCAT("/people/page/", REPLACE(STR(?speaker__id), "^.*\\\\/(.+)", "$1")) AS ?speaker__dataProviderUrl)
    WHERE {
    ?id ^(semparl_linguistics:referenceToPlace/skos:relatedMatch)/semparls:speaker ?speaker__id .
      ?speaker__id skos:prefLabel ?speaker__prefLabel .
    } ORDERBY ?speaker__prefLabel 
  }
} 
`
