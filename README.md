# MyAPI README
MyAPI is a simple REST API designed for managing customer data. This document serves as a guide to make HTTP requests to our API.

## Base URL
The base URL for all endpoints is:

http://localhost:3001

Endpoints
Below are the available endpoints:

GET /
GET /api/persons/:id
POST /api/persons
DELETE /api/persons/:id
GET /api/persons
GET /info

## GET /
This is the home route and it will return an HTML response.


### curl http://localhost:3001

## GET /api/persons/:id
This endpoint retrieves a person with a given id.

Parameters:

id - This is the id of the person.

Example request:


curl http://localhost:3001/api/persons/1

## POST /api/persons
This endpoint creates a new person.

Body Parameters:

name - The name of the person.
important - A boolean indicating the importance status of the person. (Optional)
weight - The weight of the person.
age - The age of the person.
Example request:


curl -X POST -H "Content-Type: application/json" -d '{"name": "John Doe", "important": true, "weight": 70, "age": 30}' http://localhost:3001/api/persons

## DELETE /api/persons/:id
This endpoint deletes a person with a given id.

Parameters:

id - This is the id of the person.

Example request:

curl -X DELETE http://localhost:3001/api/persons/1

## GET /api/persons
This endpoint retrieves all persons.

Example request:


curl http://localhost:3001/api/persons

## GET /info
This endpoint retrieves the total number of persons and current server time.

Example request:

curl http://localhost:3001/info
Errors
The API will return the following error types when requests fail:

400: Bad Request – There is missing or invalid information in your request.
404: Not Found – The requested resource could not be found.
500: Internal Server Error – We had a problem with our server. Please try again later.
Setup
To run the server locally:

Clone the repository
Install the dependencies with npm install
Start the server with npm start