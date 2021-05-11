const perspectiveID = 'perspective1'

export const speechPropertiesInstancePage =
`   {
      # ?id skos:prefLabel ?prefLabel__id .
      BIND(?id as ?prefLabel__id )

      ?id semparls:speaker ?speaker__id .
      ?speaker__id skos:prefLabel ?speaker__label .
      BIND (?prefLabel__id as ?prefLabel__prefLabel)
      BIND(?id as ?uri__id)
      BIND(?id as ?uri__dataProviderUrl)
      BIND(?id as ?uri__prefLabel)
    }
`

export const speechPropertiesFacetResults =
  ` # ?id skos:prefLabel ?prefLabel__id .
    BIND(?id as ?prefLabel__id )
    ?id semparls:speaker ?speaker__id .
    ?speaker__id skos:prefLabel ?speaker__label .
    BIND (?prefLabel__id as ?prefLabel__prefLabel)
    BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
`

export const expressionProperties =
`   {
      ?id skos:prefLabel ?prefLabel__id .
      BIND (?prefLabel__id as ?prefLabel__prefLabel)
      BIND(CONCAT("/expressions/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
      BIND(?id as ?uri__id)
      BIND(?id as ?uri__dataProviderUrl)
      BIND(?id as ?uri__prefLabel)
    }
    UNION
    {
      ?id dct:source ?source__id .
      ?source__id skos:prefLabel ?source__prefLabel .
      ?source__id mmm-schema:data_provider_url ?source__dataProviderUrl .
    }
    UNION
    {
      ?id ^crm:P128_carries ?manuscript__id .
      ?manuscript__id skos:prefLabel ?manuscript__prefLabel .
      BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?manuscript__id), "^.*\\\\/(.+)", "$1")) AS ?manuscript__dataProviderUrl)
    }
    UNION
    {
      ?id crm:P72_has_language ?language__id .
      ?language__id skos:prefLabel ?language__prefLabel .
      BIND(?language__id as ?language__dataProviderUrl)
    }
`

export const collectionProperties =
 `  {
       ?id skos:prefLabel ?prefLabel__id .
       BIND (?prefLabel__id as ?prefLabel__prefLabel)
       BIND(CONCAT("/collections/page/", ENCODE_FOR_URI(REPLACE(STR(?id), "^.*\\\\/(.+)", "$1"))) AS ?prefLabel__dataProviderUrl)
       BIND(?id as ?uri__id)
       BIND(?id as ?uri__dataProviderUrl)
       BIND(?id as ?uri__prefLabel)
     }
     UNION
     {
       ?id dct:source ?source__id .
       ?source__id skos:prefLabel ?source__prefLabel .
       ?source__id mmm-schema:data_provider_url ?source__dataProviderUrl .
     }
     UNION
     {
       ?id ^crm:P46i_forms_part_of ?manuscript__id .
       ?manuscript__id skos:prefLabel ?manuscript__prefLabel .
       BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?manuscript__id), "^.*\\\\/(.+)", "$1")) AS ?manuscript__dataProviderUrl)
     }
     UNION
     {
       ?id crm:P51_has_former_or_current_owner ?owner__id .
       ?owner__id skos:prefLabel ?owner__prefLabel .
       BIND(CONCAT("/actors/page/", REPLACE(STR(?owner__id), "^.*\\\\/(.+)", "$1")) AS ?owner__dataProviderUrl)
     }
     UNION
     {
       ?id mmm-schema:collection_location ?place__id .
       ?place__id skos:prefLabel ?place__prefLabel .
       BIND(CONCAT("/places/page/", REPLACE(STR(?place__id), "^.*\\\\/(.+)", "$1")) AS ?place__dataProviderUrl)
     }
`

export const manuscriptInstancePageNetworkLinksQuery = `
  SELECT DISTINCT (?id as ?source) ?target (1 as ?weight)
  WHERE {
    VALUES ?id { <ID> }
    ?id crm:P51_has_former_or_current_owner ?owner .
    ?target crm:P51_has_former_or_current_owner ?owner .
  }
  LIMIT 10
`

export const manuscriptFacetResultsNetworkLinksQuery = `
  SELECT DISTINCT (?manuscript as ?source) ?target ("Author" as ?prefLabel)
  WHERE {
    <FILTER>
    ?manuscript mmm-schema:manuscript_author/^mmm-schema:manuscript_author ?target .
  }
`

export const manuscriptNetworkNodesQuery = `
  SELECT DISTINCT ?id ?prefLabel ?class ?href
  WHERE {
    VALUES ?class { frbroo:F4_Manifestation_Singleton }
    VALUES ?id { <ID_SET> }
    ?id a ?class ;
      skos:prefLabel ?prefLabel .
    BIND(CONCAT("/perspective1/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?href)
  }
`

export const productionPlacesQuery = `
  SELECT ?id ?lat ?long
  (COUNT(DISTINCT ?manuscripts) as ?instanceCount)
  WHERE {
    <FILTER>
    ?manuscripts ^crm:P108_has_produced/crm:P7_took_place_at ?id .
    ?id wgs84:lat ?lat ;
        wgs84:long ?long .
  }
  GROUP BY ?id ?lat ?long
`

export const productionCoordinatesQuery = `
  SELECT ?lat ?long
  WHERE {
    <FILTER>
    ?manuscripts ^crm:P108_has_produced/crm:P7_took_place_at ?place .
    ?place wgs84:lat ?lat ;
           wgs84:long ?long .
  }
`

export const lastKnownLocationsQuery = `
  SELECT ?id ?lat ?long
  (COUNT(DISTINCT ?manuscripts) as ?instanceCount)
  WHERE {
    <FILTER>
    ?manuscripts mmm-schema:last_known_location ?id .
    ?id wgs84:lat ?lat ;
        wgs84:long ?long .
  }
  GROUP BY ?id ?lat ?long
`

// # https://github.com/uber/deck.gl/blob/master/docs/layers/arc-layer.md
export const migrationsQuery = `
  SELECT DISTINCT ?id
  ?from__id ?from__prefLabel ?from__lat ?from__long ?from__dataProviderUrl
  ?to__id ?to__prefLabel ?to__lat ?to__long ?to__dataProviderUrl
  (COUNT(DISTINCT ?manuscript) as ?instanceCount)
  WHERE {
    <FILTER>
    ?manuscript ^crm:P108_has_produced/crm:P7_took_place_at ?from__id ;
            mmm-schema:last_known_location ?to__id .
    ?from__id skos:prefLabel ?from__prefLabel ;
              geo:lat ?from__lat ;
              geo:long ?from__long .
    BIND(CONCAT("/places/page/", REPLACE(STR(?from__id), "^.*\\\\/(.+)", "$1")) AS ?from__dataProviderUrl)
    ?to__id skos:prefLabel ?to__prefLabel ;
            geo:lat ?to__lat ;
            geo:long ?to__long .
    BIND(CONCAT("/places/page/", REPLACE(STR(?to__id), "^.*\\\\/(.+)", "$1")) AS ?to__dataProviderUrl)
    BIND(IRI(CONCAT(STR(?from__id), "-", REPLACE(STR(?to__id), "http://ldf.fi/mmm/place/", ""))) as ?id)
    FILTER(?from__id != ?to__id)
  }
  GROUP BY ?id
  ?from__id ?from__prefLabel ?from__lat ?from__long ?from__dataProviderUrl
  ?to__id ?to__prefLabel ?to__lat ?to__long ?to__dataProviderUrl
  ORDER BY desc(?instanceCount)
`

export const migrationsDialogQuery = `
  SELECT * {
    <FILTER>
    ?id ^crm:P108_has_produced/crm:P7_took_place_at <FROM_ID> ;
                    mmm-schema:last_known_location <TO_ID> ;
                    skos:prefLabel ?prefLabel .
    BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?dataProviderUrl)
  }
`

export const productionsByDecadeQuery = `
  SELECT ?category (COUNT (DISTINCT ?instance) as ?count) WHERE {
    <FILTER>
    ?instance ^crm:P108_has_produced/crm:P4_has_time-span/mmm-schema:decade ?category .
  }
  GROUP BY ?category
  ORDER BY ?category
`
export const eventsByDecadeQuery = `
  SELECT DISTINCT ?category
  (COUNT(?production) AS ?productionCount)
  (COUNT(?transfer) AS ?transferCount)
  (COUNT(?observation) AS ?observationCount)
  WHERE {
    <FILTER>
    {
      ?manuscript ^crm:P108_has_produced ?production .
      ?production crm:P4_has_time-span/mmm-schema:decade ?category .
    }
    UNION
    {
      ?manuscript ^crm:P30_transferred_custody_of ?transfer .
      ?transfer crm:P4_has_time-span/mmm-schema:decade ?category .
    }
    UNION
    {
      ?manuscript ^mmm-schema:observed_manuscript ?observation .
      ?observation crm:P4_has_time-span/mmm-schema:decade ?category .
    }
  }
  GROUP BY ?category
  ORDER BY ?category
`

export const knowledgeGraphMetadataQuery = `
  SELECT *
  WHERE {
    ?id a sd:Dataset ;
        dct:title ?title ;
        dct:publisher ?publisher ;
        dct:rightsHolder ?rightsHolder ;
        dct:modified ?modified ;
        dct:source ?databaseDump__id .
    ?databaseDump__id skos:prefLabel ?databaseDump__prefLabel ;
                      mmm-schema:data_provider_url ?databaseDump__dataProviderUrl ;
                      dct:modified ?databaseDump__modified .
  }
`
