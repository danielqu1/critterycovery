from flask import Flask, render_template, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow import fields
import json									# jsonify
from gitlab import stats					# gitlab.py

# https://flask-marshmallow.readthedocs.io/en/latest/

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

ma = Marshmallow(app)


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

# model of Species for SQLAlchemy
class species_table(db.Model):
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
class habitats_table(db.Model):
	id = db.Column(db.Integer)
	name = db.Column(db.Unicode, primary_key=True)
	marine = db.Column(db.Boolean) 
	reported_marine_area = db.Column(db.Float)
	reported_terrestrial_area = db.Column(db.Float)
	countries = db.Column(db.Unicode)
	iucn_category = db.Column(db.Integer)
	designation_name = db.Column(db.Unicode)
	designation_id = db.Column(db.Integer)
	link = db.Column(db.Unicode)

# model for connection between Species and Country
class countries_per_species(db.Model):
	id = db.Column(db.Integer, primary_key=True)  # this field needs to be added to db
	scientific_name = db.Column(db.Unicode)
	alpha2_code = db.Column(db.Unicode)

# SCHEMA FOR MARSHMALLOW
class CountrySchema(ma.Schema):
	class Meta:
		ordered = True

	name = fields.String(required=True)
	alpha2_code = fields.String(required=False)
	alpha3_code = fields.String(required=False)
	total_pop = fields.Integer(required=False)
	capital = fields.String(required=False)
	region = fields.String(required=False)
	subregion =fields.String(required=False)
	latitude = fields.Float(required=False)
	longitude = fields.Float(required=False)
	area = fields.Float(required=False)
	gini_index = fields.Integer(required=False)
	flag = fields.String(required=False) # it's a link, is it a string?


class SpeciesSchema(ma.Schema):
	class Meta:
		ordered = True

	scientific_name = fields.String(required=True)
	subspecies = fields.String(required=False)
	kingdom = fields.String(required=False)
	phylum = fields.String(required=False)
	_class = fields.String(required=False)
	_order = fields.String(required=False)
	family = fields.String(required=False)
	genus = fields.String(required=False)
	common_name = fields.String(required=False)
	population_trend = fields.String(required=False)
	marine = fields.Boolean(required=False)
	freshwater = fields.Boolean(required=False)
	terrestrial = fields.Boolean(required=False)


class HabitatSchema(ma.Schema):
	class Meta:
		ordered = True

	id = fields.Integer(required=False)
	name = fields.String(required=True)
	marine = fields.Boolean(required=False)
	reported_marine_area = fields.Float(required=False)
	reported_terrestrial_area = fields.Float(required=False)
	countries = fields.String(required=False)
	iucn_category = fields.Integer(required=False)
	designation_name = fields.String(required=False)
	designation_id = fields.Integer(required=False)
	link = fields.String(required=False)


class CountrySpeciesLinkSchema(ma.Schema):
	class Meta:
		ordered = True

	id = fields.Integer(required=True)  # this field needs to be added to db
	scientific_name = fields.String(required=False)
	alpha2_code = fields.String(required=False)

country_schema = CountrySchema()
countries_schema = CountrySchema(many=True)

specie_schema = SpeciesSchema()
species_schema = SpeciesSchema(many=True)

habitat_schema = HabitatSchema()
habitats_schema = HabitatSchema(many=True)

country_species_link_schema = CountrySpeciesLinkSchema()
countries_species_link_schema = CountrySpeciesLinkSchema(many=True)


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

# get all countries
@app.route("/api/countries")
def get_countries():
	countries = countries_table.query.all()
	response = countries_schema.dump(countries)
	return jsonify({"countries" : response})

# get a single country by name
# https://flask-sqlalchemy.palletsprojects.com/en/2.x/queries/#querying-records
@app.route("/api/countries/name=<name>", methods=["GET"])
def get_country(name):
	country = countries_table.query.filter_by(name=name).first()
	if country is None:
		print("country ", name, " does not exist")
		print("How to make error page?")
		return {}
	response = country_schema.dump(country)
	return jsonify({"country" : response})

# get a single country by ISO 2
@app.route("/api/countries/alpha2_code=<alpha2_code>", methods=["GET"])
def get_country_alpha2(alpha2_code):
	country = countries_table.query.filter_by(alpha2_code=alpha2_code).first()
	if country is None:
		print("country ", alpha2_code, " does not exist")
		print("How to make error page?")
		return {}
	response = country_schema.dump(country)
	return jsonify({"country" : response})

# get a single country by ISO 3
@app.route("/api/countries/alpha3_code=<alpha3_code>", methods=["GET"])
def get_country_alpha3(alpha3_code):
	country = countries_table.query.filter_by(alpha3_code=alpha3_code).first()
	if country is None:
		print("country ", alpha3_code, " does not exist")
		print("How to make error page?")
		return {}
	response = country_schema.dump(country)
	return jsonify({"country" : response})

# get habitats for a single country by name
@app.route("/api/countries/habitats/alpha3_code=<alpha3_code>", methods=["GET"])
def get_country_habitats(alpha3_code):
	habitats = habitats_table.query.filter_by(countries=alpha3_code).all()
	if habitats is None:
		print("country ", name, " does not exist")
		print("How to make error page?")
		return {}
	response = habitats_schema.dump(habitats)
	return jsonify({"habitats" : response})

# get species for a single country by name 
@app.route("/api/countries/species/name=<name>", methods=["GET"])
def get_country_species(name):
	alpha2_code = country_schema.dump(countries_table.query.filter_by(name=name).first())["alpha2_code"]
	species = countries_per_species.query.filter_by(alpha2_code=alpha2_code).all()
	if species is None:
		print("country ", name, " does not exist")
		print("How to make error page?")
		return {}
	response = species_schema.dump(species)
	return jsonify({"species" : response})

# get all habitats
@app.route("/api/habitats")
def get_habitats():
	habitats = habitats_table.query.all()
	response = habitats_schema.dump(habitats)
	return jsonify({"habitats" : response})

# get a single habitat by name
@app.route("/api/habitats/name=<name>", methods=["GET"])
def get_habitat(name):
	habitat = habitats_table.query.filter_by(name=name).first()
	if habitat is None:
		print("habitat ", name, " does not exist")
		print("How to make error page?")
		return {}
	response = habitat_schema.dump(habitat)
	return jsonify({"habitat" : response})

# get all species
@app.route("/api/species")
def get_species():
	species = species_table.query.all()
	response = species_schema.dump(species)
	return jsonify({"species" : response})

# get a single species by name
@app.route("/api/species/name=<name>", methods=["GET"])
def get_specie(name):
	specie = species_table.query.filter_by(scientific_name=name).first()
	if specie is None:
		print("specie ", name, " does not exist")
		print("How to make error page?")
		return {}
	response = specie_schema.dump(specie)
	return jsonify({"species" : response})


if __name__ == "__main__":
	app.run(host="0.0.0.0", port=80, threaded=True, debug=True)
