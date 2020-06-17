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
r_cols = ['userId', 'movieId', 'rating', 'timestamp']
ratings = pd.read_csv('ua.base', sep='\t', names=r_cols, encoding='latin-1')
movies = pd.read_csv('movies.csv',nrows=5000)
ratings = pd.merge(ratings,movies).drop(['genres','timestamp'],axis=1)

n_users_base = ratings['userId'].unique().max()
n_items_base = ratings['movieId'].unique().max()

train_matrix = np.zeros((n_users_base, n_items_base))
for line in ratings.itertuples():
    train_matrix[line[1]-1,line[2]-1] = line[3]

user_similarity = pairwise_distances(train_matrix, metric='cosine')

def predict_user_user(train_matrix, user_similarity, n_similar=30):
    similar_n = user_similarity.argsort()[:,-n_similar:][:,::-1]
    pred = np.zeros((n_users_base,n_items_base))
    for i,users in enumerate(similar_n):
        similar_users_indexes = users
        similarity_n = user_similarity[i,similar_users_indexes]
        matrix_n = train_matrix[similar_users_indexes,:]
        rated_items = similarity_n[:,np.newaxis].T.dot(matrix_n - matrix_n.mean(axis=1)[:,np.newaxis])/ similarity_n.sum()
        pred[i,:]  = rated_items
    return pred

predictions = predict_user_user(train_matrix,user_similarity, 50) + train_matrix.mean(axis=1)[:, np.newaxis]

predicted_ratings = predictions[train_matrix.nonzero()]
train_truth = train_matrix[train_matrix.nonzero()]

math.sqrt(mean_squared_error(predicted_ratings,train_truth))

item_similarity = pairwise_distances(train_matrix.T, metric = 'cosine')

def predict_item_item(train_matrix, item_similarity, n_similar=30):
    similar_n = item_similarity.argsort()[:,-n_similar:][:,::-1]
    print('similar_n shape: ', similar_n.shape)
    pred = np.zeros((n_users_base,n_items_base))
    
    for i,items in enumerate(similar_n):
        similar_items_indexes = items
        similarity_n = item_similarity[i,similar_items_indexes]
        matrix_n = train_matrix[:,similar_items_indexes]
        rated_items = matrix_n.dot(similarity_n)/similarity_n.sum()
        pred[:,i]  = rated_items
    return pred

predictions = predict_item_item(train_matrix,item_similarity,50)

predicted_ratings = predictions[train_matrix.nonzero()]
train_truth = train_matrix[train_matrix.nonzero()]
math.sqrt(mean_squared_error(predicted_ratings,train_truth))



import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
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

# def get_title_from_index(index):
#     return movies[movies.index == index]["title"].values[0]

@app.route('/data')
def hello_world():
    user_id = int(request.args.get("user"))
    user_ratings = predictions[user_id-1,:]
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