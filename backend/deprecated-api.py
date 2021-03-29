# not working din't use this!!!! 
# use api.py instead
# keeping this file for reference

from flask import Flask, render_template, request
from flask_cors import CORS
from gitlab import stats					# gitlab.py
# from dbstuff.create_tables import create_species_table
# import requests
from sqlalchemy import create_engine
# from sqlalchemy import text
from flask_sqlalchemy import SQLAlchemy
from flask_restless import APIManager
from flask_restful import Api 

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
#manager.init_app(app)

api = Api(app)

# # database setup
engine = create_engine(f"postgresql://{db_user}:{db_password}@{db_name}", echo=False, future=True)
# create_countries_table(engine)  # keep commented, do not run this again

# model of Country for SQLAlchemy
class countries_table(db.Model):
    name = db.Column(db.Unicode, primary_key=True)
    alpha2_code = db.Column(db.Unicode)
    alpha3_code = db.Column(db.Unicode)
    total_pop = db.Column(db.Integer)
    capital = db.Column(db.Unicode)
    region = db.Column(db.Unicode)
    subregion = db.Column(db.Unicode)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    area = db.Column(db.Float)
    gini_index = db.Column(db.Integer)
    flag = db.Column(db.Unicode) # it's a link, is it a string?

# # model of Species for SQLAlchemy
# class Species(db.Model):
#     scientific_name = db.Column(db.Unicode, primary_key=True)
#     subspecies = db.Column(db.Unicode)
#     kingdom = db.Column(db.Unicode)
#     phylum = db.Column(db.Unicode)
#     _class = db.Column(db.Unicode)
#     _order = db.Column(db.Unicode)
#     family = db.Column(db.Unicode)
#     genus = db.Column(db.Unicode)
#     common_name = db.Column(db.Unicode)
#     population_trend = db.Column(db.Unicode)
#     marine = db.Column(db.Boolean)
#     freshwater = db.Column(db.Boolean)
#     terrestrial = db.Column(db.Boolean)

# # model of Habitat for SQLAlchemy
# class Habitat(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.Unicode)
#     marine = db.Column(db.Boolean) 
#     reported_marine_area = db.Column(db.Float)
#     reported_terrestrial_area = db.Column(db.Float)
#     countries = db.Column(db.Unicode)
#     iucn_category = db.Column(db.Integer)
#     designation = db.Column(db.Unicode)
#     link = db.Column(db.Unicode)

# # model for connection between Species and Country
# class CountrySpeciesLink(db.Model):
#     id = db.Column(db.Integer, primary_key=True)  # this field needs to be added to db
#     scientific_name = db.Column(db.Unicode)
#     alpha2_code = db.Column(db.Unicode)

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


def create_endpoint(model, name, single=None):
	if single is None:
		postprocessors = {}
	else:
		postprocessors = {"GET_SINGLE" : [single]}

	manager.create_api(model, methods=["GET"], collection_name=name, postprocessors=postprocessors)

	


def country_singleton(result):
	links = countries_table.query.filter_by(name=result["name"]).all()
	result["countries"] = [
		{"id" : 5, "name" : "Beluga"}
	]



#manager.create_api(Country)
#manager.create_api(Species, methods=["GET"], collection_name="species")
#manager.create_api(Habitat, methods=["GET"], collection_name="habitat")

create_endpoint(countries_table, "countries_table", country_singleton)



@app.route("/api/countries")
def get_country():
    from sqlalchemy.orm import sessionmaker
    Session = sessionmaker(bind=engine)
    session = Session()
    country_name = request.args.get('country')	# Spain
    print("country name =", country_name)
    # my_country = session.query(countries_table).filter_by(name=country_name).first() 
    my_country = session.query(countries_table)
    # session.close()
    ret = {}
    ret['blah'] = my_country
    return ret

if __name__ == "__main__":
	app.run(host="0.0.0.0", port=80, threaded=True, debug=True)


