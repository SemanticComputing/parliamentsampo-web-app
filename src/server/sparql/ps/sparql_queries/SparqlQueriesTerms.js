export const termPropertiesInstancePage =
` 
BIND(?id as ?uri__id)
BIND(?id as ?uri__dataProviderUrl)
BIND(?id as ?uri__prefLabel)

{ 
  ?id sch:relatedLink ?exlink__id .
  BIND ("Kansanedustajat" AS ?exlink__prefLabel)
  BIND(?exlink__id AS ?exlink__dataProviderUrl)
}
UNION
{
  ?id crm:P81a_begin_of_the_begin ?timespan__start .
  OPTIONAL { ?id crm:P82b_end_of_the_end ?timespan__end }
  BIND(CONCAT(STR(?timespan__start), "–", COALESCE(STR(?timespan__end), "")) AS ?timespan) 
}
UNION
{ ?group__id crm:P10_falls_within ?id ;
    a/rdfs:subClassOf+ bioc:Group ;
    skos:prefLabel ?group__prefLabel .
  FILTER(LANG(?group__prefLabel) = "<LANG>")
  BIND(CONCAT("/groups/page/", REPLACE(STR(?group__id), "^.*\\\\/(.+)", "$1")) AS ?group__dataProviderUrl)
}
UNION
{
  SELECT DISTINCT ?id ?member__id ?member__prefLabel ?member__dataProviderUrl WHERE {
      ?member__id bioc:bearer_of/crm:P11i_participated_in/semparls:organization/crm:P10_falls_within ?id ;
                 skos:prefLabel ?member__prefLabel .
     BIND(CONCAT("/people/page/", REPLACE(STR(?member__id), "^.*\\\\/(.+)", "$1")) AS ?member__dataProviderUrl)
   }
}
UNION
{
  ?id skos:prefLabel ?prefLabel__id .
  BIND(?prefLabel__id as ?prefLabel__prefLabel)
  FILTER(LANG(?prefLabel__prefLabel)="<LANG>")
}
`
