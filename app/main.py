import tempfile
from flask import Flask

app = Flask(__name__)


def insecure_file(results):
    tempfilename = tempfile.mktemp()
    with open(tempfilename, "wb") as f:
        f.write(results.encode())
    print("Results written to", tempfilename.name)


def insecure_file2(results):
    tempfilename2 = tempfile.mktemp()
    with open(tempfilename2, "wb") as f:
        f.write(results.encode())
    print("Results written to", tempfilename2.name)


@app.route("/")
def hello_world():
    return "Hello, World!"


@app.route("/octocat")
def show_octocat_original():
    return "<img src='https://octodex.github.com/images/original.png'>"


@app.route("/daftpunktocat")
def show_octocat():
    return "<img src='https://octodex.github.com/images/daftpunktocat-thomas.gif'>"


@app.route("/octocat-hulatocat")
def show_octocat_hulatocat():
    return "<img src='https://octodex.github.com/images/hula_loop_octodex03.gif'>"


@app.route("/nothing-here")
def show_image():
    return "<img src='https://media.giphy.com/media/3o7TKz9bX9v9Kz2wvO/giphy.gif'>"


@app.route("/french")
def show_french():
    return "Bonjour!"
