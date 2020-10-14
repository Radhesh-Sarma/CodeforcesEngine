from flask import Flask, jsonify,request
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
from query import query

app = Flask(__name__)
api = Api(app)
# CORS(app, resources={r"/*": {"origins": "*"}})
# app.config['CORS_SUPPORTS_CREDENTIALS'] = True
# app.config["CORS_ALLOW_HEADERS"] = 'Content-Type'
# app.config["CORS_EXPOSE_HEADERS"] = 'Content-Type'

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  response.headers.add('Access-Control-Allow-Credentials', 'true')
  return response

searchtext = ''
response = {
        'answer': [
        [
            188.59600614888515,
            "1422-F.txt"
        ],
        [
            125.73067076592343,
            "1372-B.txt"
        ],
        [
            125.73067076592343,
            "1350-C.txt"
        ],
        [
            125.73067076592343,
            "1349-A.txt"
        ],
        [
            125.73067076592343,
            "1166-E.txt"
        ],
        [
            62.86533538296172,
            "992-B.txt"
        ],
        [
            62.86533538296172,
            "1389-A.txt"
        ],
        [
            62.86533538296172,
            "1016-G.txt"
        ],
        [
            0.0,
            "999-F.txt"
        ],
        [
            0.0,
            "999-E.txt"
        ]
    ]
}

class HelloWorld(Resource):
    def get(self):
        return {"answer" : query(searchtext,10)}
    def post(self):
        print(request.json['data'])
        searchtext = request.json['data']
        print('Superman Pranjal ' + searchtext)
        return {'answer': query(searchtext,15)}

api.add_resource(HelloWorld, '/',methods=['GET', 'POST','PUT'])

if __name__ == '__main__':
    app.run(debug=True)
