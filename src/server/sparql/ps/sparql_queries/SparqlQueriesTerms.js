export const termPropertiesInstancePage =
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
  ?id crm:P81a_begin_of_the_begin ?timespan__start .
  OPTIONAL { ?id crm:P82b_end_of_the_end ?timespan__end }
  BIND(CONCAT(STR(?timespan__start), "–", COALESCE(STR(?timespan__end), "")) AS ?timespan) 
}
UNION
{ 
  ?id sch:relatedLink ?exlink__id .
  BIND ("Kansanedustajat" AS ?exlink__prefLabel)
  BIND(?exlink__id AS ?exlink__dataProviderUrl)
}
UNION
{ 
  ?group__id crm:P10_falls_within ?id ;
    a [ rdfs:subClassOf{1,3} bioc:Group ] ;
    skos:prefLabel ?group__prefLabel .
  FILTER(LANG(?group__prefLabel) = "<LANG>") 
  BIND(CONCAT("/groups/page/", REPLACE(STR(?group__id), "^.*\\\\/(.+)", "$1")) AS ?group__dataProviderUrl)
}
UNiON
{
  ?session__id semparls:electoralTerm ?id ;
               skos:prefLabel ?session__prefLabel .
  FILTER(LANG(?session__prefLabel) = "<LANG>")
  BIND(CONCAT("/sessions/page/", REPLACE(STR(?session__id), "^.*\\\\/(.+)", "$1")) AS ?session__dataProviderUrl)
} 
UNION
{
  SELECT DISTINCT ?id ?member__id ?member__prefLabel ?member__dataProviderUrl WHERE {
    ?member__id bioc:bearer_of/crm:P11i_participated_in 
      [ a semparls:ParliamentMembership ; crm:P10_falls_within ?id ] ;
      skos:prefLabel ?member__prefLabel .
     BIND(CONCAT("/people/page/", REPLACE(STR(?member__id), "^.*\\\\/(.+)", "$1")) AS ?member__dataProviderUrl)
   }
}
UNION
{
  SELECT DISTINCT ?id ?related__id
    (COUNT(DISTINCT ?prs) AS ?count)
    (CONCAT(STR(?label), ' (', STR(?count), ')') AS ?related__prefLabel) 
    (CONCAT("/terms/page/", REPLACE(STR(?related__id), "^.*\\\\/(.+)", "$1")) AS ?related__dataProviderUrl)
  WHERE { 
      ?prs bioc:bearer_of/crm:P11i_participated_in/semparls:organization/crm:P10_falls_within ?id ;
          bioc:bearer_of/crm:P11i_participated_in/semparls:organization/crm:P10_falls_within ?related__id .
   FILTER (?related__id!=?id)
   ?related__id a semparls:ElectoralTerm ; skos:prefLabel ?label .
  } GROUP BY ?id ?related__id ?label ORDER BY DESC(?count)
}
`
