from flask import Flask, render_template
from flask_cors import CORS
from gitlab import stats

app = Flask(
    __name__,
    static_folder="../frontend/build/static",
    template_folder="../frontend/build"
)
CORS(app)

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