Problem Statement:-

Implement an API that allows users to:
Get a list of all books.
Get details of a particular book by its ID.
Add a book to the shopping cart.
Remove a book from the shopping cart.
Place an order

API Documentation:

Base URL: http://localhost:8000/api

1.  Register User:
    Endpoint: POST /register
    This API allows you to register a new user. The request body should be a JSON object with the following fields:

    userName (string, required): User name of the new user.
    email (string, required): Email address of the new user.
    password (string, required): Password of the new user.