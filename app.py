from flask import Flask, jsonify, request, render_template
import json, requests

app = Flask(__name__)

# -------------------------------- index ------------------------------ #

@app.route('/')
def index():
    return render_template('index.html')

#--------------------------------- filtrage ---------------------------- #

@app.route('/api/places')
def api_places():
    # Requête Overpass (OSM)
    overpass_query = """
    [out:json];
    (
      node["tourism"="museum"](48.5,1.5,51.1,4.5);
      node["historic"="monument"](48.5,1.5,51.1,4.5);
      node["amenity"="place_of_worship"](48.5,1.5,51.1,4.5);
      node["tourism"="artwork"](48.5,1.5,51.1,4.5);
    );
    out center;
    """

    response = requests.post(
        "https://overpass-api.de/api/interpreter",
        data=overpass_query,
        timeout=30
    )

    data = response.json()

    places = []

    for element in data.get("elements", []):
        places.append({
            "id": element.get("id"),
            "lat": element.get("lat"),
            "lon": element.get("lon"),
            "name": element.get("tags", {}).get("name", "Sans nom"),
            "tags": element.get("tags", {})
        })

    return jsonify(places)



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)