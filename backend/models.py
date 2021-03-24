from api import db				# api.py

# model of Country for SQLAlchemy
class Country(db.Model):
    id = db.Column(db.Unicode, primary_key=True)
    name = db.Column(db.Unicode)
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
    scientific_name = db.Column(db.Unicode)
    subspecies = db.Column(db.Unicode)
    # countries = db.Column(db.Unicode) # some type of array
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
    id = cd.Column(db.Integer)
    name = db.Column(db.Unicode)
    marine = db.Column(db.Boolean) 
    reported_marine_area = db.Column(db.Float)
    reported_terrestrial_area = db.Column(db.Float)
    # countries = smthn - array
    iucn_category = db.Column(db.Integer)
    designation = db.Column(db.Unicode)
    link = db.Column(db.Unicode)