import requests
# import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy import text

engine = create_engine("sqlite+pysqlite:///:memory:", echo=True, future=True)

# with engine.connect() as conn:
#     conn.execute(text("CREATE TABLE some_table (x int, y int)"))
#     conn.execute(
#         text("INSERT INTO some_table (x, y) VALUES (:x, :y)"),
#         [{"x": 1, "y": 1}, {"x": 2, "y": 4}]
#     )
#     conn.commit()
#     result = conn.execute(text("SELECT x, y FROM some_table"))
#     for row in result:
#         print(f"x: {row.x}  y: {row.y}")

countries_link = "https://restcountries.eu/rest/v2/all"
countries_response = requests.get(countries_link).json()
l = []
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
    l.append(d)

with engine.connect() as conn:
    conn.execute(text("CREATE TABLE countries_table (name varchar, alpha2_code varchar, alpha3_code varchar, " +
                    "total_pop int, capital varchar, region varchar, subregion varchar, latitude int, " +
                    "longitude int, area float, gini_index int, flag varchar)"))
    conn.execute(
        text("INSERT INTO countries_table (name, alpha2_code, alpha3_code, total_pop, capital, region, subregion, " +
                    "latitude, longitude, area, gini_index, flag) " +
                    "VALUES (:name, :alpha2_code, :alpha3_code, :total_pop, :capital, :region, :subregion, " +
                    ":latitude, :longitude, :area, :gini_index, :flag)"),
        l
    )
    conn.commit()
    result = conn.execute(text("SELECT name, alpha2_code, alpha3_code, total_pop, capital, region, subregion, " + 
                    "latitude, longitude, area, gini_index, flag FROM countries_table"))
    for row in result:
        print(f"{row.name} {row.alpha2_code} {row.alpha3_code} {row.total_pop} {row.capital} {row.region} " +
                f"{row.subregion} {row.latitude} {row.longitude} {row.area} {row.gini_index}, {row.flag}")

def create_countries_tables():
    countries_link = "https://restcountries.eu/rest/v2/all"
    countries_response = requests.get(countries_link).json()
    for i in countries_response:
        print(i["name"])
