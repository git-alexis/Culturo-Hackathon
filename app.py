from flask import Flask, jsonify, request, render_template
import json

app = Flask(__name__)

# -------------------------------- index ------------------------------ #
@app.route('/')
def index():
    return render_template('index.html')

#--------------------------------- filtrage ---------------------------- #

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)