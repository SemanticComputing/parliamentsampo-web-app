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
    (semparls:ElectoralTerm 8)
    (semparls:Publication 9)
    (crm:E53_Place 10)
    (semparls:Organization 11)
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
    # NB. problem with instance of multiple classes
    FILTER NOT EXISTS { ?id a semparls:Committee }
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
    ?id a semparls:ElectoralTerm ;
      skos:prefLabel ?prefLabel__id .
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
    BIND(CONCAT("/terms/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
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
  VALUES ?type__id { bioc:Occupation }
  ?id a rdfs:Class ; rdfs:subClassOf+ ?type__id ; skos:prefLabel ?prefLabel__id .
  FILTER (lang(?prefLabel__id)="fi")
  BIND(?prefLabel__id as ?prefLabel__prefLabel)
  BIND(7 as ?orderBy)
  BIND(CONCAT("/occupations/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)

  ?type__id skos:prefLabel ?type__prefLabel .
  FILTER(LANG(?type__prefLabel) = 'fi')
}
  `
