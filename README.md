
# REST API for a review app
##### The idea is that we all read books and watch movies. I certainly do a lot of book reading so I wanted to have an app where user could signup and write reviews about the books and movies that they have read. It is not typical movie or book review application. It is just for your personal use only. If you want, you can make your reviews public and they can be accessible to anyone but its more like having a personal collection of all the movies that you have watched and books you have read.

## Pre-requistives
### You need two NoSQL database running
* Redis at default port (Redis has been used for refresh token / renewal of Bearer token)
* MongoDB at the default port

## Endpoints
- POST - /users/signup "username, fullname, password, email"
- POST - /users/login "username, password " "POST"
- POST - users/refreshToken "refreshToken" "POST"
- GET, POST, DELETE - /reviews "Check the MongoDB Schema in the models folder" - Delete requires admin rights
- GET, PUT, DELETE - /reviews/mongoId

## Steps
* npm install
* npm start (Change the mongodb and redis connection strings to "localhost")

<<<<<<< HEAD
## To run this app in docker container
* docker-compose up

## MESSAGE
###### I love improving myself. If you have time please go through the code and suggest me improvements in terms of my coding style, logic or anything that you feel can help me.
