#!/usr/bin/env python
# encoding: utf-8
import json
import numpy as np
from flask import Flask, request, jsonify, render_template
from flask_mongoengine import MongoEngine
from flask_pymongo import PyMongo


app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/deforestation_db"
mongo = PyMongo(app)


@app.route("/")
def welcome():
    """Return Index Page"""

    return render_template('index.html')

@app.route("/plotchart")
def plotchart():
    """Return Plot Chart Page"""

    return render_template('plotchart.html')

@app.route("/plotmap")
def plotmap():
    """Return Plot Map Page."""

    return render_template('plotmap.html')

@app.route("/api/plotdata")
def plotdatareturn():
    """List All Available Chart Plotting API Data"""
    # Convert list of tuples into normal list
    list2 = list(mongo.db.listings.find({},{ "_id": 0 }))
    return json.dumps(list2, default=str)

@app.route("/api/mapdata")
def mapdatareturn():
    """List All Available Map Plotting API Data"""
    # Convert list of tuples into normal list
    list3 = list(mongo.db.mappingfile.find({},{ "_id": 0 }))
    return json.dumps(list3, default=str)

# @app.route("/api/all")
# def alldatareturn():
#     """List all available api routes."""
#     list4 = list(mongo.db.listings.find({},{ "_id": 0 }))
#     list5 = list(mongo.db.mappingfile.find({},{ "_id": 0 }))
#     return json.dumps([list4, list5], default=str)

if __name__ == '__main__':
    app.run(debug=True)


