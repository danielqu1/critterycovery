from flask import Flask, render_template
from flask_cors import CORS
from gitlab import stats					# gitlab.py
# add more imports

from flask_sqlalchemy import SQLAlchemy

app = Flask(
    __name__,
    static_folder="../frontend/build/static",
    template_folder="../frontend/build"
)
CORS(app)

app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql://postgres:somethinghere/critterycovery"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
manager = APIManager(app, flask_sqlalchemy_db=db)

# pls keep after initializing db, because models.py needs to import this db
from models import (						# models.py
	Country,
	Species,
	Habitats
)

db.create_all()
db.session.commit()

# then populate database



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

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80, threaded=True, debug=True)



# https://www.kite.com/python/docs/sqlalchemy.create_engine

#Create a new Engine instance.

#The standard calling form is to send the URL as the first positional argument, usually a string that indicates database dialect and connection arguments:

#engine = create_engine("postgresql://scott:tiger@localhost/test")
#Additional keyword arguments may then follow it which establish various options on the resulting Engine and its underlying Dialect and Pool constructs:

#engine = create_engine("mysql://scott:tiger@hostname/dbname", encoding='latin1', echo=True)
#The string form of the URL is dialect[+driver]://user:password@host/dbname[?key=value..], where dialect is a database name such as mysql, oracle, postgresql, etc., and driver the name of a DBAPI, such as psycopg2, pyodbc, cx_oracle, etc. 
