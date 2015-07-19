from flask import Flask
from flask import render_template, redirect

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/ocr')
def ocr():
    return render_template('ocr.html')

if __name__ == '__main__':
    app.run()
