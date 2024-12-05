import sys
import json
import pickle
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

model_path = '/Users/aymanhaque/Developer/Enterprise/Shelves/src/data/models/book-recommender-model'
embeddings_path = '/Users/aymanhaque/Developer/Enterprise/Shelves/src/data/models/book_embeddings.pkl'
books_data_path = '/Users/aymanhaque/Developer/Enterprise/Shelves/src/data/models/books_data.json'

model = SentenceTransformer(model_path)

with open(embeddings_path, 'rb') as f:
    book_embeddings = pickle.load(f)

with open(books_data_path, 'r') as f:
    books_data = json.load(f)

if len(sys.argv) < 5:
    print("Usage: python recommend.py <user_input> <theme_weight> <pace_weight> <length_weight>")
    sys.exit(1)

user_input = sys.argv[1]
weights = list(map(float, sys.argv[2:5]))

if len(weights) != 3:
    print("Error: Exactly three weights (theme, pace, length) must be provided.")
    sys.exit(1)

user_embedding = model.encode([user_input])

positive_similarities = cosine_similarity(user_embedding, book_embeddings).flatten()

final_scores = positive_similarities * sum(weights)

seen_titles = set()
recommendations = []
for idx in final_scores.argsort()[::-1]:
    book = books_data[idx]
    if book['title'] not in seen_titles:
        recommendations.append({
            "_id": book["_id"], 
            "title": book["title"],
            "author": book.get("author", "Unknown"),
            "score": float(final_scores[idx]) 
        })

        seen_titles.add(book['title'])
    if len(seen_titles) >= 100: 
        break

print(json.dumps(recommendations, indent=2))
