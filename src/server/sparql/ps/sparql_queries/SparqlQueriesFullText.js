export const fullTextSearchProperties = `
{
  VALUES (?type__id ?orderBy) {
    (bioc:Person 1)
    (semparls:Government 2)
    (semparls:Party 3)
    (semparls:Committee 4)
    (semparls:ParliamentaryBody 5)
    (semparls:ElectoralDistrict 6)
    (semparls:MunicipalCouncil 7)
    (semparls:Publication 8)
    (crm:E53_Place 9)
    (semparls:Organization 10)
    (semparls:School 11)
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
    ?id a semparls:Committee ; skos:prefLabel ?prefLabel__id .
    FILTER (lang(?prefLabel__id)="fi")
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
    BIND(CONCAT("/committees/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
  }
  UNION 
  {
    ?id a semparls:ParliamentaryBody ; skos:prefLabel ?prefLabel__id .
    FILTER (lang(?prefLabel__id)="fi")
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
    BIND(CONCAT("/committees/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
  }
  UNION 
  {
    ?id a semparls:Publication ; skos:prefLabel ?prefLabel__id .
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
    BIND(CONCAT("/publications/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
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
