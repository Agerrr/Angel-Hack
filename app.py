from flask import Flask, jsonify
from flask import render_template, redirect, request, url_for
from cluster_point import CPDatabase
import requests


app = Flask(__name__)
db = CPDatabase()

@app.route('/')

def index():
    return render_template('index.html')


data = {'niacin': {"id": 1, "formula" : "CCO3", "description": "does this even exist??"}}
db.insert(data)
db.retrieve(1)

@app.route('/ocr')
def ocr():
    return render_template('ocr.html')



@app.route('/process-image', methods=['POST', 'GET'])
def process_image(): 
	print(request.method)
	if request.method == 'POST': 
		url = "https://api.idolondemand.com/1/api/async/ocrdocument/v1/";
		payload = {file: request.files}
		print (request.files['file'])
		return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug='true')





 