from flask import Flask,request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
import pandas as pd
from scipy import sparse
from sklearn.metrics.pairwise import pairwise_distances
from sklearn.metrics import mean_squared_error
import math
import numpy as np
import scipy.sparse as sp
from scipy.sparse.linalg import svds
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
r_cols = ['userId', 'movieId', 'rating', 'timestamp']
ratings = pd.read_csv('ua.base', sep='\t', names=r_cols, encoding='latin-1')
movies = pd.read_csv('movies.csv',nrows=10000)
ratings = pd.merge(ratings,movies).drop(['genres','timestamp'],axis=1)

n_users_base = ratings['userId'].unique().max()
n_items_base = ratings['movieId'].unique().max()

train_matrix = np.zeros((n_users_base, n_items_base))
for line in ratings.itertuples():
    train_matrix[line[1]-1,line[2]-1] = line[3]

u, s, vt = svds(train_matrix, k = 20)

s_diag_matrix = np.diag(s)

predictions_svd = np.dot(np.dot(u,s_diag_matrix),vt)

def get_title_from_index(index):
    return df[df.index == index]["title"].values[0]

def get_index_from_title(title):
    return df[df.title == title]["movieId"].values[0]
df = pd.read_csv('movies.csv',nrows=5000)
df['genres'] = df['genres'].fillna('')
def modify(row):
    return (row['genres'].split('|'))
def key(row):
    words = ''
    for i in row['modify']:
        words = words + ' ' + i
    return words
df["modify"] = df.apply(modify,axis=1)
df["key"] = df.apply(key,axis=1)
cv = CountVectorizer()
count_matrix = cv.fit_transform(df["key"])
cosine_sim = cosine_similarity(count_matrix) 

def content(movies):
    movie_user_likes = movies

##Get index of this movie from its title
    movie_index = get_index_from_title(movie_user_likes)

    similar_movies =  list(enumerate(cosine_sim[movie_index]))

##Get a list of similar movies in descending order of similarity score
    sorted_similar_movies = sorted(similar_movies,key=lambda x:x[1],reverse=True)

## Print titles of first 50 movies
    i=0
    li=[]
    for element in sorted_similar_movies:
            li.append(get_title_from_index(element[0]))
            i=i+1
            if i>5:
                break
    return li

@app.route('/data')
def hello_world():
    user_id = int(request.args.get("user"))
    user_ratings = predictions_svd[user_id-1,:]
    train_unkown_indices = np.where(train_matrix[user_id-1,:] == 0)[0]
    train_unkown_indices
    user_recommendations = user_ratings[train_unkown_indices]
    print('\nRecommendations for user {} are the movies: \n'.format(user_id))
    l=[]
    l1 = []
    for movie_id in user_recommendations.argsort()[-5:][: : -1]:
        z = get_title_from_index(movie_id+1)
        con = content(z)
        con.append(z)
        l.append(con)
    for i in l:
        for j in i:
            l1.append(j)
    return {
        'data':l1
    }

if __name__ == '__main__': 
	app.run()