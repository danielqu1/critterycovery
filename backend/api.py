from flask import Flask, render_template
from flask_cors import CORS
from gitlab import stats
# add more imports

app = Flask(
    __name__,
    static_folder="../frontend/build/static",
    template_folder="../frontend/build"
)
CORS(app)

# app.config[
#     "SQLALCHEMY_DATABASE_URI"
# ] = "postgresql://postgres:somethinghere/critterycovery"
# app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# db = SQLAlchemy(app)
# manager = APIManager(app, flask_sqlalchemy_db=db)

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

# # model of Country for SQLAlchemy
# class Country(db.Model):
#     id = db.Column(db.Unicode, primary_key=True)
#     name = db.Column(db.Unicode)
#     alpha2_code = db.Column(db.Unicode)
#     alpha3_code = db.Column(db.Unicode)
#     total_pop = db.Column(db.Integer)
#     capital = db.Column(db.Unicode)
#     region = db.Column(db.Unicode)
#     subregion = db.Column(db.Unicode)
#     latitude = db.Column(db.Float)
#     longitude = db.Column(db.Float)
#     area = db.Column(db.Integer)
#     gini_index = db.Column(db.Float)
#     flag = db.Column(db.Unicode) # it's a link, is it a string?

# # model of Species for SQLAlchemy
# class Species(db.Model):
#     # some connection between species plus and IUCN
#     common_name = db.Column(db.Unicode) # some type of array, not unicode?
#     scientific_name = db.Column(db.Unicode)
#     kingdom = db.Column(db.Unicode)
#     phylum = db.Column(db.Unicode)
#     _class = db.Column(db.Unicode)
#     order = db.Column(db.Unicode)
#     family = db.Column(db.Unicode)
#     subspecies = db.Column(db.Unicode)
#     subpopulations = db.Column(db.Unicode)

# # model of Habitat for SQLAlchemy
# class Habitat(db.Model):
#     name = db.Column(db.Unicode)
#     marine = db.Column(db.Unicode) # boolean? 
#     reported_marine_area = db.Column(db.Float)
#     reported_terrestrial_area = db.Column(db.Float)
#     # countries = smthn - array
#     iucn_category = db.Column(db.Integer)
#     designation = db.Column(db.Unicode)
#     link = db.Column(db.Unicode)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80, threaded=True, debug=True)