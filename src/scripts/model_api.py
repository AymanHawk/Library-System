import os
import json
import pickle
import numpy as np
from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import subprocess

app = Flask(__name__)

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.json
        user_input = data['userInput']
        weights = data['weights']

        python_script = '/Users/aymanhaque/Developer/Enterprise/Backups/Library-System/src/scripts/recommend.py'
        command = ['python', python_script, user_input] + [str(w) for w in weights]

        result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

        if result.returncode != 0:
            return jsonify({"error": "Script execution failed", "details": result.stderr}), 500

        recommendations = json.loads(result.stdout)

        return jsonify(recommendations)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001)
