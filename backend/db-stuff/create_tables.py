import requests
from sqlalchemy import create_engine
from sqlalchemy import text

engine = create_engine("sqlite+pysqlite:///:memory:", echo=True, future=True)

def create_countries_table():
    countries_link = "https://restcountries.eu/rest/v2/all"
    countries_response = requests.get(countries_link).json()
    countries_array = []
    for i in countries_response:
        d = {}
        d["name"] = i["name"]
        d["alpha2_code"] = i["alpha2Code"]
        d["alpha3_code"] = i["alpha3Code"]
        d["total_pop"] = i["population"]
        d["capital"] = i["capital"]
        d["region"] = i["region"]
        d["subregion"] = i["subregion"]
        latlng = i["latlng"]
        if len(latlng) == 2:
            d["latitude"] = i["latlng"][0]
            d["longitude"] = i["latlng"][1]
        else:
            d["latitude"] = None
            d["longitude"] = None
        d["area"] = i["area"]
        d["gini_index"] = i["gini"]
        d["flag"] = i["flag"]
        countries_array.append(d)

    with engine.connect() as conn:
        conn.execute(text("CREATE TABLE countries_table (name varchar, alpha2_code varchar, alpha3_code varchar, " +
                        "total_pop int, capital varchar, region varchar, subregion varchar, latitude float, " +
                        "longitude float, area float, gini_index int, flag varchar)"))
        conn.execute(
            text("INSERT INTO countries_table (" + string_helper(countries_array[0], False) + ") " +
                        "VALUES (" + string_helper(countries_array[0], True) + ")"), 
            countries_array
        )
        conn.commit()
        result = conn.execute(text("SELECT * FROM countries_table"))
        for row in result:
            print(row)

def create_habitats_table():
    habitats_link_base = "http://api.protectedplanet.net/v3/protected_areas"
    habitats_token = "?token=c92c5b78feaa4845c2d9eca6ea90cc61"
    habitats_pages = "&per_page=50&page="
    for page_num in range(1, 2):  # change this later for more pages
        habitats_link = habitats_link_base + habitats_token + habitats_pages + str(page_num) 
        habitats_response = requests.get(habitats_link).json()["protected_areas"]
        habitats_array = []
        for i in habitats_response:
            d = {}
            d["id"] = i["id"]
            d["name"] = i["name"]
            d["marine"] = i["marine"]
            d["reported_marine_area"] = i["reported_marine_area"]
            d["reported_terrestrial_area"] = i["reported_area"]
            d["countries"] = i["countries"][0]["iso_3"] # or could connect on "name"
            d["iucn_category"] = i["iucn_category"]["id"]
            d["designation_name"] = i["designation"]["name"]
            d["designation_id"] = i["designation"]["id"]
            d["link"] = i["links"]["protected_planet"]
            habitats_array.append(d)

    with engine.connect() as conn:
        conn.execute(text("CREATE TABLE habitats_table (id int, name varchar, marine boolean, " + 
                        "reported_marine_area float, reported_terrestrial_area float, countries varchar, " + 
                        "iucn_category int, designation_name varchar, designation_id int, link varchar)"))
        conn.execute(
            text("INSERT INTO habitats_table (" + string_helper(habitats_array[0], False) + ") " +
                        "VALUES (" + string_helper(habitats_array[0], True) + ")"), 
            habitats_array
        )
        conn.commit()
        result = conn.execute(text("SELECT * FROM habitats_table"))
        for row in result:
            print(row)

def create_species_table():
    iucn_link_base = "https://apiv3.iucnredlist.org/api/v3/species/"
    iucn_token = "?token=6926163f47db8665a1a736b0c241af81bf13923ee884fb35e5818d23df9f8755"
    iucn_link = iucn_link_base + "category/CR" + iucn_token
    species_response = requests.get(iucn_link).json()["result"]
    species_array = []
    for i in species_response:
        d = {}
        d["scientific_name"] = i["scientific_name"]
        d["subspecies"] = i["subspecies"]
        d["subpopulation"] = i["subpopulation"]
        countries_endpoint = iucn_link_base + "countries/name/" + i["scientific_name"] + iucn_token
        countries_response = requests.get(countries_endpoint).json()["result"]
        d["countries"] = countries_response[0]["code"] # returns iso2, or could do "country"
        specifics_endpoint = iucn_link_base + i["scientific_name"] + iucn_token
        specifics_response = requests.get(specifics_endpoint).json()["result"][0]
        d["kingdom"] = specifics_response["kingdom"]
        d["phylum"] = specifics_response["phylum"]
        d["_class"] = specifics_response["class"]
        d["_order"] = specifics_response["order"]
        d["family"] = specifics_response["family"]
        d["genus"] = specifics_response["genus"]
        d["common_name"] = specifics_response["main_common_name"]
        d["population_trend"] = specifics_response["population_trend"]
        d["marine"] = specifics_response["marine_system"]
        d["freshwater"] = specifics_response["freshwater_system"]
        d["terrestrial"] = specifics_response["terrestrial_system"]
        species_array.append(d)
        break # DO NOT REMOVE THIS!!!!!!!!!! (only after connecting to db)

    with engine.connect() as conn:
        conn.execute(text("CREATE TABLE species_table (scientific_name varchar, subspecies varchar, " +
                        "subpopulation varchar, countries varchar, kingdom varchar, phylum varchar, " +
                        "_class varchar, _order varchar, family varchar, genus varchar, common_name varchar, " +
                        "population_trend varchar, marine boolean, freshwater boolean, terrestrial boolean)"))
        conn.execute(
            text("INSERT INTO species_table (" + string_helper(species_array[0], False) + ") " +
                        "VALUES (" + string_helper(species_array[0], True) + ")"), 
            species_array
        )
        conn.commit()
        result = conn.execute(text("SELECT * FROM species_table"))
        for row in result:
            print(row)

def string_helper(d: dict, b: bool):
    result = ""
    for key in d:
        if b == True:
            result = result + ":"
        result = result + key + ", "
    result = result[:-2]
    return result

create_species_table()