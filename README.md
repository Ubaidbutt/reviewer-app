
# REST API for a review app
### The idea is that we all read books and watch movies. I certainly do a lot of book reading. I wanted to have an app where user could signup and write reviews about the books and movies that they have read. It is not typical movie or book review application. It is for your personal use only. If you want, you can make your reviews public and they can accessible to anyone but its more like having a personal collection of all the movies that you have watched and books you have read.

## Pre-requistives
### You need two NoSQL database running
* Redis at default port
* MongoDB at the default port

## Endpoints
- POST - /users/signup "username, fullname, password, email"
- POST - /users/login "username, password " "POST"
- POST - users/refreshToken "refreshToken" "POST"
- GET, POST, DELETE - /reviews "Check the MongoDB Schema in the models folder" - Delete requires admin rights
- GET, PUT, DELETE - /reviews/mongoId

## Steps
* npm install
* npm start