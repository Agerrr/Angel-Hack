from flask import Flask, jsonify
from flask import render_template, redirect, request, url_for
from cluster_point import CPDatabase
import requests
import json


app = Flask(__name__)
db = CPDatabase()

@app.route('/', methods=['POST', 'GET'])
def index():
	data1 = db.retrieve('vitamin-D')	
	data2 = db.retrieve('whey')	
	data3 = db.retrieve('zinc')	

	return render_template('index.html', 
		results1=json.dumps(data1, indent=4, encoding="utf-8"), 
		results2 = json.dumps(data2, indent=4, encoding="utf-8"), 
		results3 = json.dumps(data3, indent=4, encoding="utf-8") 
		)
	# return data
	# return render_template('index.html',  results = data)
	

@app.route('/fetch_ingredients', methods=['POST', 'GET'])
def fetch_ingredients():
	ids = request.form
	print ids
	results = []
	#iterate through ids and retrieve text from clusterDB
	for cluster_key in ids: 
		results.append(db.retrieve(cluster_key))

	print results 
	return json.dumps(results)

@app.route('/ocr')
def ocr():
    return render_template('ocr.html')


if __name__ == '__main__':
    app.run()
