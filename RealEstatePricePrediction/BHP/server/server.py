from flask import Flask,request,jsonify
#imported flask modules.
import util
from flask_cors import CORS
#app is to launch the flask server when runned.

app=Flask(__name__)
CORS(app)

#the below code prints hi when the /hello used after 120.0.0.1:5000 

#the we changed the methods to get location.
#we will create util now.
@app.route('/get_location_names')
def get_location_names():
    response=jsonify({
        'location':util.get_location_names()
    })
    response.headers.add('Acess-Control-Allow-Origin',"*")

    return response

@app.route('/predict_home_price',methods=['POST'])
def predict_home_price():
    total_sqft=float(request.form['total_sqft'])
    location=request.form['location']
    bhk=int(request.form['bhk'])
    bath=int(request.form['bath'])

    response=jsonify({
        'estimated_price': util.get_estimated_price(location,total_sqft,bhk,bath)
    })

    return response
if __name__=="__main__":
    print("starting python flask server for home price prediction")
    app.run()