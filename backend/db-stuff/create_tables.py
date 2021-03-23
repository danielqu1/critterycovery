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
                        "total_pop int, capital varchar, region varchar, subregion varchar, latitude int, " +
                        "longitude int, area float, gini_index int, flag varchar)"))
        conn.execute(
            text("INSERT INTO countries_table (name, alpha2_code, alpha3_code, total_pop, capital, region, subregion, " +
                        "latitude, longitude, area, gini_index, flag) " +
                        "VALUES (:name, :alpha2_code, :alpha3_code, :total_pop, :capital, :region, :subregion, " +
                        ":latitude, :longitude, :area, :gini_index, :flag)"),
            countries_array
        )
        conn.commit()
        result = conn.execute(text("SELECT name, alpha2_code, alpha3_code, total_pop, capital, region, subregion, " + 
                        "latitude, longitude, area, gini_index, flag FROM countries_table"))
        for row in result:
            print(f"{row.name} {row.alpha2_code} {row.alpha3_code} {row.total_pop} {row.capital} {row.region} " +
                    f"{row.subregion} {row.latitude} {row.longitude} {row.area} {row.gini_index}, {row.flag}")

def create_habitats_table():
    habitats_link = "http://api.protectedplanet.net/v3/protected_areas?token=c92c5b78feaa4845c2d9eca6ea90cc61&per_page=50&page=1"
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

def create_species_table():
    iucn_link = "https://apiv3.iucnredlist.org/api/v3/species/category/CR?token=6926163f47db8665a1a736b0c241af81bf13923ee884fb35e5818d23df9f8755"
    species_response = requests.get(iucn_link).json()["result"]
    species_array = []
    for i in species_response:
        d = {}
        d["scientific_name"] = i["scientific_name"]
        d["subspecies"] = i["subspecies"]
        d["subpopulation"] = i["subpopulation"]
        countries_endpoint = "https://apiv3.iucnredlist.org/api/v3/species/countries/name/" + i["scientific_name"] + "?token=6926163f47db8665a1a736b0c241af81bf13923ee884fb35e5818d23df9f8755"
        countries_response = requests.get(countries_endpoint).json()["result"]
        d["countries"] = countries_response[0]["code"] # returns iso2, or could do "country"
        specifics_endpoint = "https://apiv3.iucnredlist.org/api/v3/species/" + i["scientific_name"] + "?token=6926163f47db8665a1a736b0c241af81bf13923ee884fb35e5818d23df9f8755"
        specifics_response = requests.get(specifics_endpoint).json()["result"]
        d["kingdom"] = specifics_response["kingdom"]
        d["phylum"] = specifics_response["phylum"]
        d["_class"] = specifics_response["class"]
        d["order"] = specifics_response["order"]
        d["family"] = specifics_response["family"]
        d["genus"] = specifics_response["genus"]
        d["common_name"] = specifics_response["main_common_name"]
        d["population_trend"] = specifics_response["population_trend"]
        d["marine"] = specifics_response["marine_system"]
        d["freshwater"] = specifics_response["freshwater_system"]
        d["terrestrial"] = specifics_response["terrestrial_system"]
        species_array.append(d)
        break # DO NOT REMOVE THIS!!!!!!!!!! (only after connecting to db)


create_species_table()