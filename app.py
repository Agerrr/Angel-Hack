from flask import Flask, jsonify
from flask import render_template

app = Flask(__name__)


@app.route('/')
def index():
    return 'Flask is running!'


@app.route('/data')
def names():
    data = {
        "first_names": ["John", "Jacob", "Julie", "Jennifer"],
        "last_names": ["Connor", "Johnson", "Cloud", "Ray"]
    }
    return jsonify(data)


@app.route('/<filename>')
def music_player(filename):
    return render_template('music_player.html', filename=filename)

if __name__ == '__main__':
    app.run()
