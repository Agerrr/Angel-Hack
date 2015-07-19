
from flask import Flask, jsonify
from flask import render_template, redirect
from cluster_point import CPDatabase


app = Flask(__name__)
db = CPDatabase()

@app.route('/')

def index():
    return render_template('index.html')



@app.route('/ocr')
def ocr():
    return render_template('ocr.html')

if __name__ == '__main__':
    app.run()



 
