import requests
from sqlalchemy import create_engine
from sqlalchemy import text
from flask_sqlalchemy import SQLAlchemy

db_user = "postgres"
db_password = "pleaseWork"
db_name = "104.197.145.153/postgres"
engine = create_engine(f"postgresql://{db_user}:{db_password}@{db_name}", echo=False, future=True)

# engine = create_engine("sqlite+pysqlite:///:memory:", echo=False, future=True)

def create_countries_table(engine):
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

def create_habitats_table(engine):
    habitats_link_base = "http://api.protectedplanet.net/v3/protected_areas"
    habitats_token = "?token=c92c5b78feaa4845c2d9eca6ea90cc61"
    habitats_pages = "&per_page=50&page="
    habitats_array = []
    for page_num in range(1, 11):  # change this later for more pages
        habitats_link = habitats_link_base + habitats_token + habitats_pages + str(page_num) 
        habitats_response = requests.get(habitats_link).json()["protected_areas"]
        for i in habitats_response:
            d = {}
            d["id"] = i["id"]
            d["name"] = i["name"]
            d["marine"] = i["marine"]
            d["reported_marine_area"] = i["reported_marine_area"]
            d["reported_terrestrial_area"] = i["reported_area"]
            d["countries"] =  i["countries"][0]["iso_3"]
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
        # result = conn.execute(text("SELECT * FROM habitats_table"))
        # for row in result:
        #     print(row)

def create_species_table(engine):
    iucn_link_base = "https://apiv3.iucnredlist.org/api/v3/species/"
    iucn_token = "?token=6926163f47db8665a1a736b0c241af81bf13923ee884fb35e5818d23df9f8755"
    iucn_link = iucn_link_base + "category/CR" + iucn_token
    species_response = requests.get(iucn_link).json()["result"]
    species_array = []
    countries_per_species = []
    count = 0
    id_count = 0
    for i in species_response:
        count += 1
        if count % 7 != 0:
            continue
        # if count > 50:
        #     break
        d = {}
        d["scientific_name"] = i["scientific_name"]
        d["subspecies"] = i["subspecies"]
        countries_endpoint = iucn_link_base + "countries/name/" + i["scientific_name"] + iucn_token
        specifics_endpoint = iucn_link_base + i["scientific_name"] + iucn_token
        text_endpoint = iucn_link_base + "narrative/" + i["scientific_name"] + iucn_token
        try:
            specifics_response = requests.get(specifics_endpoint).json()["result"][0]
        except:
            continue
        if specifics_response["kingdom"] != "ANIMALIA":
            continue
        try:
            countries_response = requests.get(countries_endpoint).json()["result"]
            text_response = requests.get(text_endpoint).json()["result"][0]
        except:
            continue
        for j in countries_response:
            d_temp = {}
            id_count += 1
            d_temp["id"] = id_count
            d_temp["scientific_name"] = i["scientific_name"]
            d_temp["alpha2_code"] = j["code"]  # returns iso2, or could do "country"
            countries_per_species.append(d_temp)
        # data from specifics response
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
        # data from narative text
        d["taxonomic_notes"] = text_response["taxonomicnotes"]
        d["rationale"] = text_response["rationale"]
        d["geographic_range"] = text_response["geographicrange"]
        d["population"] = text_response["population"]
        d["text_habitat"] = text_response["habitat"]
        d["threats"] = text_response["threats"]
        d["conservation_measures"] = text_response["conservationmeasures"]
        # image link
        d["image_link"] = get_species_image(i["scientific_name"])
        species_array.append(d)
        # break # DO NOT REMOVE THIS!!!!!!!!!! (only after connecting to db)

    with engine.connect() as conn:
        conn.execute(text("CREATE TABLE species_table_2 (scientific_name varchar, subspecies varchar, " +
                        "kingdom varchar, phylum varchar, " +
                        "_class varchar, _order varchar, family varchar, genus varchar, common_name varchar, " +
                        "population_trend varchar, marine boolean, freshwater boolean, terrestrial boolean, " +
                        "taxonomic_notes text, rationale text, geographic_range text, population text, " +
                        "text_habitat text, threats text, conservation_measures text, image_link varchar)"))
        conn.execute(
            text("INSERT INTO species_table_2 (" + string_helper(species_array[0], False) + ") " +
                        "VALUES (" + string_helper(species_array[0], True) + ")"), 
            species_array
        )
        conn.commit()
        # result = conn.execute(text("SELECT * FROM species_table_2"))
        # for row in result:
        #     print(row)
        # print("STARTING COUNTRIES_PER_SPECIES TABLE")
        conn.execute(text("CREATE TABLE countries_per_species_2 (id int, scientific_name varchar, alpha2_code varchar)"))
        conn.execute(
            text("INSERT INTO countries_per_species_2 (id, scientific_name, alpha2_code) " +
                        "VALUES (:id, :scientific_name, :alpha2_code)"), 
            countries_per_species
        )
        conn.commit()
        # result = conn.execute(text("SELECT * FROM countries_per_species_2"))
        # for row in result:
        #     print(row)

image_link1 = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBEA-sCsOy12Qca3i-jy2kF1nIRSulICNA&cx=23d27d9bd3761439e&q="
image_link2 = "&searchType=image&num=1"
fake_img = "https://www.wiki.sc4devotion.com/images/6/62/Wiki_no_image.png"

def get_species_image(name: str):
    img_endpoint = image_link1 + name + image_link2
    ret = ""
    try:
        ret = requests.get(img_endpoint).json()["items"][0]["link"]
    except:
        ret = fake_img
    return ret

def string_helper(d: dict, b: bool):
    result = ""
    for key in d:
        if b == True:
            result = result + ":"
        result = result + key + ", "
    result = result[:-2]
    return result

create_species_table(engine)  # keep this commented out 