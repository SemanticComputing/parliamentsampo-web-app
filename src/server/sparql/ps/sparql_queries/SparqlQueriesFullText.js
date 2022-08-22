export const fullTextSearchProperties = `
{
VALUES ?type__id {
  crm:E53_Place
  bioc:Person
  semparls:ElectoralDistrict
  semparls:Government
  semparls:MunicipalCouncil
  semparls:Party
  semparls:Publication
  semparls:Organization
  semparls:School
}
?id a ?type__id .
?type__id skos:prefLabel ?type__prefLabel . 
FILTER(LANG(?type__prefLabel) = 'fi')

{
  ?id a bioc:Person ;
    skos:prefLabel ?prefLabel__id .
  BIND(?prefLabel__id as ?prefLabel__prefLabel)
  BIND(CONCAT("/people/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
}
UNION
{
  ?id a crm:E53_Place ; skos:prefLabel ?prefLabel__id .
  FILTER NOT EXISTS { ?id semparls:has_duplicate_child [] }
  BIND(?prefLabel__id as ?prefLabel__prefLabel)
  BIND(CONCAT("/places/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
}
UNION 
{
  ?id a semparls:ElectoralDistrict ; skos:prefLabel ?prefLabel__id .
  FILTER (lang(?prefLabel__id)="fi")
  BIND(?prefLabel__id as ?prefLabel__prefLabel)
  BIND(CONCAT("/districts/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
}
UNION 
{
  ?id a semparls:Government ; skos:prefLabel ?prefLabel__id .
  FILTER (lang(?prefLabel__id)="fi")
  BIND(?prefLabel__id as ?prefLabel__prefLabel)
  BIND(CONCAT("/groups/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
}
UNION 
{
  ?id a semparls:MunicipalCouncil ; skos:prefLabel ?prefLabel__id .
  FILTER (lang(?prefLabel__id)="fi")
  BIND(?prefLabel__id as ?prefLabel__prefLabel)
  BIND(CONCAT("/groups/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
}
UNION 
{
  ?id a semparls:Organization ; skos:prefLabel ?prefLabel__id .
  FILTER (lang(?prefLabel__id)="fi")
  BIND(?prefLabel__id as ?prefLabel__prefLabel)
  BIND(CONCAT("/groups/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
}
UNION 
{
  ?id a semparls:Party ; skos:prefLabel ?prefLabel__id .
  FILTER (lang(?prefLabel__id)="fi")
  BIND(?prefLabel__id as ?prefLabel__prefLabel)
  BIND(CONCAT("/groups/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
}
UNION 
{
  ?id a semparls:School ; skos:prefLabel ?prefLabel__id .
  FILTER (lang(?prefLabel__id)="fi")
  BIND(?prefLabel__id as ?prefLabel__prefLabel)
  BIND(CONCAT("/groups/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
}
}
UNION
{
  VALUES ?sclass { bioc:Occupation }
  ?id a rdfs:Class ; rdfs:subClassOf ?sclass ; skos:prefLabel ?prefLabel__id .
  FILTER (lang(?prefLabel__id)="fi")
  BIND(?prefLabel__id as ?prefLabel__prefLabel)
  BIND(CONCAT("/occupations/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)

  ?sclass skos:prefLabel ?type__prefLabel .
  FILTER(LANG(?type__prefLabel) = 'fi')
}
  `
