from flask import Flask, render_template
from flask_cors import CORS
from gitlab import stats					# gitlab.py
# from dbstuff.create_tables import create_species_table
import requests
from sqlalchemy import create_engine
from sqlalchemy import text
from flask_sqlalchemy import SQLAlchemy
from flask_restless import APIManager

app = Flask(
    __name__,
    static_folder="../frontend/build/static",
    template_folder="../frontend/build"
)
CORS(app)

db_user = "postgres"
db_password = "pleaseWork"
db_name = "104.197.145.153/postgres"

app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://{db_user}:{db_password}@{db_name}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
manager = APIManager(app, flask_sqlalchemy_db=db)

engine = create_engine(f"postgresql://{db_user}:{db_password}@{db_name}", echo=False, future=True)
# create_countries_table(engine)  # keep commented, do not run this again

# model of Country for SQLAlchemy
class Country(db.Model):
    name = db.Column(db.Unicode, primary_key=True)
    alpha2_code = db.Column(db.Unicode)
    alpha3_code = db.Column(db.Unicode)
    total_pop = db.Column(db.Integer)
    capital = db.Column(db.Unicode)
    region = db.Column(db.Unicode)
    subregion = db.Column(db.Unicode)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    area = db.Column(db.Integer)
    gini_index = db.Column(db.Float)
    flag = db.Column(db.Unicode) # it's a link, is it a string?

# model of Species for SQLAlchemy
class Species(db.Model):
    scientific_name = db.Column(db.Unicode, primary_key=True)
    subspecies = db.Column(db.Unicode)
    kingdom = db.Column(db.Unicode)
    phylum = db.Column(db.Unicode)
    _class = db.Column(db.Unicode)
    _order = db.Column(db.Unicode)
    family = db.Column(db.Unicode)
    genus = db.Column(db.Unicode)
    common_name = db.Column(db.Unicode)
    population_trend = db.Column(db.Unicode)
    marine = db.Column(db.Boolean)
    freshwater = db.Column(db.Boolean)
    terrestrial = db.Column(db.Boolean)

# model of Habitat for SQLAlchemy
class Habitat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode)
    marine = db.Column(db.Boolean) 
    reported_marine_area = db.Column(db.Float)
    reported_terrestrial_area = db.Column(db.Float)
    countries = db.Column(db.Unicode)
    iucn_category = db.Column(db.Integer)
    designation = db.Column(db.Unicode)
    link = db.Column(db.Unicode)

# model for connection between Species and Country
class CountrySpeciesLink(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # this field needs to be added to db
    scientific_name = db.Column(db.Unicode)
    alpha2_code = db.Column(db.Unicode)

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def index(path):
    return render_template("index.html")

@app.route("/api/name")
def name():
    return {"name": "CRITTERYCOVERY"}

@app.route("/api/gitlabstats")
def gitlabstats():
    return stats()



manager.create_api(Country, methods=["GET"], collection_name="countries")
manager.create_api(Species, methods=["GET"], collection_name="species")
manager.create_api(Habitat, methods=["GET"], collection_name="habitat")



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80, threaded=True, debug=True)


