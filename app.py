from flask import Flask, jsonify
from flask import render_template, redirect, request, url_for
from cluster_point import CPDatabase
import requests
import json


app = Flask(__name__)
db = CPDatabase()

@app.route('/', methods=['POST', 'GET'])
def index():
	data = db.retrieve('vitamin-D')	
	return render_template('index.html', results=json.dumps(data, sort_keys=True, indent=4, encoding="utf-8", separators=(',', ': ')))
	# return data
	# return render_template('index.html',  results = data)
	

@app.route('/ocr')
def ocr():
    return render_template('ocr.html')


if __name__ == '__main__':
    app.run(debug='true')





 